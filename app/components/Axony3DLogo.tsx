"use client";

import { useEffect, useRef } from "react";

type Point3 = [number, number, number];
type Color = [number, number, number];

const point = (x: number, y: number, z: number): Point3 => [x, y, z];

function createLogoVertices() {
  const vertices: number[] = [];
  const triangle = (a: Point3, b: Point3, c: Point3, ca: Color, cb = ca, cc = ca) => {
    for (const [p, color] of [[a, ca], [b, cb], [c, cc]] as const) {
      vertices.push(...p, ...color);
    }
  };
  const quad = (a: Point3, b: Point3, c: Point3, d: Point3, color: Color) => {
    triangle(a, b, c, color);
    triangle(a, c, d, color);
  };

  const frontA = point(-0.72, 0.72, 0.24);
  const frontB = point(0.72, 0, 0.24);
  const frontC = point(-0.72, -0.72, 0.24);
  const backA = point(-0.72, 0.72, -0.24);
  const backB = point(0.72, 0, -0.24);
  const backC = point(-0.72, -0.72, -0.24);

  // Deep rear face and the three side planes give the mark physical thickness.
  triangle(backA, backC, backB, [0.20, 0.12, 0.58]);
  quad(frontA, frontB, backB, backA, [0.58, 0.37, 0.95]);
  quad(frontB, frontC, backC, backB, [0.13, 0.24, 0.62]);
  quad(frontC, frontA, backA, backC, [0.31, 0.20, 0.74]);

  // The front is a blue-to-violet face with a subtle bright edge.
  triangle(
    frontA,
    frontB,
    frontC,
    [0.67, 0.38, 1],
    [0.24, 0.61, 1],
    [0.43, 0.28, 0.94],
  );

  // A small raised A keeps the existing brand mark recognizable at navbar size.
  const addBar = (a: [number, number], b: [number, number], width: number) => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const length = Math.hypot(dx, dy);
    const px = (-dy / length) * width / 2;
    const py = (dx / length) * width / 2;
    const z = 0.258;
    const p1 = point(a[0] + px, a[1] + py, z);
    const p2 = point(b[0] + px, b[1] + py, z);
    const p3 = point(b[0] - px, b[1] - py, z);
    const p4 = point(a[0] - px, a[1] - py, z);
    quad(p1, p2, p3, p4, [0.98, 0.97, 1]);
  };
  addBar([-0.52, -0.28], [-0.34, 0.28], 0.065);
  addBar([-0.34, 0.28], [-0.16, -0.28], 0.065);
  addBar([-0.45, -0.07], [-0.23, -0.07], 0.055);

  return new Float32Array(vertices);
}

const vertexShader = `
  attribute vec3 aPosition;
  attribute vec3 aColor;
  uniform float uTime;
  varying vec3 vColor;
  void main() {
    float turn = 0.44 + uTime * 0.42;
    float tilt = -0.12 + sin(uTime * 0.7) * 0.07;
    float cx = cos(turn);
    float sx = sin(turn);
    float cy = cos(tilt);
    float sy = sin(tilt);
    float x = aPosition.x * cx + aPosition.z * sx;
    float z = -aPosition.x * sx + aPosition.z * cx;
    float y = aPosition.y * cy - z * sy;
    z = aPosition.y * sy + z * cy;
    float perspective = 2.8 / (2.8 - z);
    gl_Position = vec4(x * perspective * 0.86, y * perspective * 0.86, z * 0.1, 1.0);
    vColor = aColor;
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

export function Axony3DLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    if (!buffer) return;
    const logoVertices = createLogoVertices();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, logoVertices, gl.STATIC_DRAW);
    gl.useProgram(program);

    const position = gl.getAttribLocation(program, "aPosition");
    const color = gl.getAttribLocation(program, "aColor");
    const time = gl.getUniformLocation(program, "uTime");
    const stride = 6 * Float32Array.BYTES_PER_ELEMENT;
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(color);
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, stride, 3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      const size = Math.round(36 * scale);
      if (canvas.width !== size || canvas.height !== size) {
        canvas.width = size;
        canvas.height = size;
      }
      gl.viewport(0, 0, size, size);
    };
    resize();
    window.addEventListener("resize", resize);

    let animationId = 0;
    const start = performance.now();
    const draw = (now: number) => {
      const elapsed = (now - start) / 1000;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniform1f(time, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, logoVertices.length / 6);
      animationId = window.requestAnimationFrame(draw);
    };
    animationId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <canvas ref={canvasRef} width={72} height={72} aria-hidden="true" style={{ display: "block", width: 36, height: 36 }} />;
}
