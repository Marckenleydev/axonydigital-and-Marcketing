
"use client";
import { useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import {T} from "../data"

const ease=[0.22,1,0.36,1];


const SERVICES_LIST = [
  "Web Development",
  "Meta Ads",
  "Content & Media Production"
];
const BUDGETS=["< AED 5k","AED 10k – AED 20k","AED 20k – AED 50k"];
const TIMELINES=["ASAP (< 1 month)","1 – 3 months","3 – 6 months","6+ months / Ongoing","Flexible"];
const STEPS=[{id:1,l:"Project Type"},{id:2,l:"Details"},{id:3,l:"About You"},{id:4,l:"Timeline"}];


export function MultiStepForm(){
  const [step,setStep]=useState(1);
  const [done,setDone]=useState(false);
  const [focus,setFocus]=useState(null);
  const [submitting,setSubmitting]=useState(false);
  const [error,setError]=useState<string | null>(null);
  const [data,setData]=useState({services:[],desc:"",budget:"",name:"",email:"",company:"",timeline:"",extra:""});
  const upd=(k,v)=>setData(d=>({...d,[k]:v}));
  const toggleSvc=(id)=>upd("services",data.services.includes(id)?data.services.filter(s=>s!==id):[...data.services,id]);
  const canNext=()=>{
    if(step===1) return data.services.length>0;
    if(step===2) return data.desc.length>10&&data.budget;
    if(step===3) return data.name&&data.email.includes("@");
    if(step===4) return data.timeline;
    return true;
  };
  const progress=(step/4)*100;

  const handleSubmit=async()=>{
    setSubmitting(true);
    setError(null);
    try{
      const res=await fetch("/api/contact",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      });
      const result=await res.json();
      if(!res.ok) throw new Error(result.error||"Submission failed");
      setDone(true);
    }catch(err){
      setError((err as Error).message);
    }finally{
      setSubmitting(false);
    }
  };

  return(
    <div style={{
      background: T.inkSoft,
      border: `1px solid ${T.cream}10`,
      width: "100%",
      borderRadius: "4px"
    }}>
      {/* Progress */}
      <div style={{borderBottom:`1px solid ${T.cream}08`}}>
        <div style={{height:2,background:`${T.cream}08`}}>
          <motion.div style={{height:"100%",background:T.amber}} animate={{width:`${progress}%`}} transition={{duration:0.5,ease}}/>
        </div>
        <div style={{
          padding: "clamp(12px, 2vh, 16px) clamp(20px, 4vw, 32px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "clamp(8px, 2vw, 16px)",
          flexWrap: "wrap"
        }}>
          <div style={{
            display: "flex",
            gap: "clamp(12px, 3vw, 20px)",
            flexWrap: "wrap"
          }}>
            {STEPS.map(s=>(
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:"clamp(4px, 1vw, 8px)"}}>
                <div style={{
                  width: "clamp(18px, 4vw, 20px)",
                  height: "clamp(18px, 4vw, 20px)",
                  border: `1px solid ${step>s.id?T.amber:step===s.id?T.amber:`${T.cream}15`}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: step>s.id?T.amber:"transparent",
                  transition: "all 0.3s",
                  flexShrink: 0
                }}>
                  <span style={{
                    fontFamily:"Inter, sans-serif",
                    fontSize: "clamp(8px, 1.8vw, 9px)",
                    color: step>s.id?T.ink:step===s.id?T.amber:`${T.cream}25`,
                    fontWeight: 700
                  }}>
                    {step>s.id?"✓":s.id}
                  </span>
                </div>
                <span style={{
                  fontFamily:"Inter, sans-serif",
                  fontSize: "clamp(9px, 2vw, 10px)",
                  color: step>=s.id?`${T.cream}65`:`${T.cream}25`,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "none",
                  whiteSpace: "nowrap"
                }} className="sm:block">{s.l}</span>
              </div>
            ))}
          </div>
          <span style={{
            fontFamily:"Inter, sans-serif",
            fontSize: "clamp(9px, 2vw, 10px)",
            color: `${T.cream}25`,
            letterSpacing: "0.18em",
            whiteSpace: "nowrap"
          }}>{step}/4</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {done?(
          <motion.div key="done" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} style={{
            padding: "clamp(40px, 8vh, 80px) clamp(20px, 4vw, 32px)",
            textAlign: "center",
            width: "100%"
          }}>
            <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",delay:0.2}}
              style={{
                width: "clamp(48px, 8vw, 64px)",
                height: "clamp(48px, 8vw, 64px)",
                border: `1px solid ${T.amber}50`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto clamp(16px, 3vh, 20px)",
                color: T.amber,
                fontSize: "clamp(20px, 4vw, 24px)"
              }}>
              ✓
            </motion.div>
            
            <h3 style={{
              fontFamily:"Inter, sans-serif",
              fontSize: "clamp(1.6rem, 5vw, 2rem)",
              fontWeight: 900,
              color: T.cream,
              marginBottom: "clamp(4px, 1vh, 8px)",
              wordBreak: "break-word"
            }}>
              Message Received.
            </h3>
            
            <p style={{
              fontFamily:"Inter, sans-serif",
              color: `${T.cream}40`,
              fontSize: "clamp(12px, 2.2vw, 13px)",
              marginBottom: "clamp(2px, 0.5vh, 4px)",
              wordBreak: "break-word"
            }}>
              Thanks, <span style={{color:T.cream}}>{data.name}</span>. We'll be at
            </p>
            
            <p style={{
              fontFamily:"Inter, sans-serif",
              color: T.amber,
              fontSize: "clamp(12px, 2.2vw, 13px)",
              marginBottom: "clamp(16px, 3vh, 20px)",
              wordBreak: "break-word"
            }}>
              {data.email}
            </p>
            
            <p style={{
              fontFamily:"Inter, sans-serif",
              color: `${T.cream}28`,
              fontSize: "clamp(11px, 2vw, 12px)",
              lineHeight: 1.65
            }}>
              Expected reply within 24 business hours.
            </p>
          </motion.div>
        ):(
          <motion.div
            key={step}
            initial={{opacity:0,x:20}}
            animate={{opacity:1,x:0}}
            exit={{opacity:0,x:-20}}
            transition={{duration:0.35,ease}}
            style={{
              padding: "clamp(24px, 4vh, 36px) clamp(20px, 4vw, 32px)",
              width: "100%"
            }}>

            {step===1&&(
              <div style={{ width: "100%" }}>
                <h3 style={{
                  fontFamily:"Inter, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
                  color: T.cream,
                  marginBottom: "clamp(4px, 1vh, 6px)",
                  letterSpacing: "-0.02em",
                  wordBreak: "break-word"
                }}>
                  What do you need built?
                </h3>
                
                <p style={{
                  fontFamily:"Inter, sans-serif",
                  color: `${T.cream}35`,
                  fontSize: "clamp(12px, 2.2vw, 13px)",
                  marginBottom: "clamp(20px, 4vh, 28px)"
                }}>
                  Select all that apply.
                </p>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
                  gap: "clamp(8px, 2vw, 10px)",
                  width: "100%"
                }}>
                  {SERVICES_LIST.map(svc=>{
                    const sel=data.services.includes(svc);
                    return(
                      <button key={svc} onClick={()=>toggleSvc(svc)} data-h
                        style={{
                          padding: "clamp(12px, 2vh, 16px) clamp(12px, 2vw, 18px)",
                          border: `1px solid ${sel?T.amber:`${T.cream}12`}`,
                          background: sel?`${T.amber}12`:"transparent",
                          color: sel?T.amber:`${T.cream}45`,
                          fontFamily:"Inter, sans-serif",
                          fontSize: "clamp(11px, 2vw, 12px)",
                          fontWeight: 600,
                          cursor: "none",
                          textAlign: "left",
                          transition: "all 0.2s",
                          letterSpacing: "0.04em",
                          width: "100%",
                          whiteSpace: "normal",
                          lineHeight: "1.2",
                          wordBreak: "break-word"
                        }}>
                        {svc} {sel&&<span style={{color:T.amber,fontSize:"clamp(9px, 1.8vw, 10px)"}}>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step===2&&(
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(20px, 4vh, 28px)",
                width: "100%"
              }}>
                <div>
                  <h3 style={{
                    fontFamily:"Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
                    color: T.cream,
                    marginBottom: "clamp(4px, 1vh, 6px)",
                    letterSpacing: "-0.02em",
                    wordBreak: "break-word"
                  }}>
                    Tell us about your project.
                  </h3>
                  
                  <p style={{
                    fontFamily:"Inter, sans-serif",
                    color: `${T.cream}35`,
                    fontSize: "clamp(12px, 2.2vw, 13px)"
                  }}>
                    The more detail, the better proposal we can give you.
                  </p>
                </div>
                
                <div style={{ width: "100%" }}>
                  <div style={{
                    fontFamily:"Inter, sans-serif",
                    fontSize: "clamp(8px, 1.8vw, 9px)",
                    color: `${T.cream}35`,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    marginBottom: "clamp(6px, 1.5vh, 8px)"
                  }}>
                    Project Description *
                  </div>
                  
                  <textarea
                    value={data.desc}
                    onChange={e=>upd("desc",e.target.value)}
                    onFocus={()=>setFocus("desc")}
                    onBlur={()=>setFocus(null)}
                    placeholder="What are you building? Who is it for? What problem does it solve?"
                    rows={4}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: `1px solid ${focus==="desc"?T.amber:`${T.cream}15`}`,
                      padding: "clamp(8px, 1.5vh, 12px) 0",
                      fontFamily:"Inter, sans-serif",
                      color: T.cream,
                      fontSize: "clamp(13px, 2.2vw, 14px)",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.3s",
                      boxSizing: "border-box"
                    }}/>
                </div>
                
                <div style={{ width: "100%" }}>
                  <div style={{
                    fontFamily:"Inter, sans-serif",
                    fontSize: "clamp(8px, 1.8vw, 9px)",
                    color: `${T.cream}35`,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    marginBottom: "clamp(8px, 2vh, 12px)"
                  }}>
                    Budget Range *
                  </div>
                  
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100px, 100%), 1fr))",
                    gap: "clamp(6px, 1.5vw, 8px)",
                    width: "100%"
                  }}>
                    {BUDGETS.map(b=>(
                      <button key={b} onClick={()=>upd("budget",b)} data-h
                        style={{
                          fontFamily:"Inter, sans-serif",
                          fontSize: "clamp(9px, 2vw, 10px)",
                          padding: "clamp(8px, 1.5vh, 12px) clamp(6px, 1vw, 8px)",
                          border: `1px solid ${data.budget===b?T.amber:`${T.cream}12`}`,
                          background: data.budget===b?`${T.amber}15`:"transparent",
                          color: data.budget===b?T.amber:`${T.cream}35`,
                          cursor: "none",
                          transition: "all 0.2s",
                          letterSpacing: "0.08em",
                          width: "100%",
                          textAlign: "center",
                          whiteSpace: "nowrap"
                        }}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step===3&&(
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(20px, 4vh, 28px)",
                width: "100%"
              }}>
                <div>
                  <h3 style={{
                    fontFamily:"Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
                    color: T.cream,
                    marginBottom: "clamp(4px, 1vh, 6px)",
                    letterSpacing: "-0.02em",
                    wordBreak: "break-word"
                  }}>
                    Who are we talking to?
                  </h3>
                  
                  <p style={{
                    fontFamily:"Inter, sans-serif",
                    color: `${T.cream}35`,
                    fontSize: "clamp(12px, 2.2vw, 13px)"
                  }}>
                    Basic details so we can reach you.
                  </p>
                </div>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
                  gap: "clamp(16px, 3vw, 24px)",
                  width: "100%"
                }}>
                  {[{k:"name", l:"Your Name *", pl:"Alex Johnson"},
                    {k:"email", l:"Email Address *", pl:"alex@company.com"}
                  ].map(f=>(
                    <div key={f.k} style={{ width: "100%" }}>
                      <div style={{
                        fontFamily:"Inter, sans-serif",
                        fontSize: "clamp(8px, 1.8vw, 9px)",
                        color: `${T.cream}35`,
                        letterSpacing: "0.24em",
                        textTransform: "uppercase",
                        marginBottom: "clamp(4px, 1vh, 6px)"
                      }}>
                        {f.l}
                      </div>
                      
                      <input
                        value={data[f.k]}
                        onChange={e=>upd(f.k,e.target.value)}
                        onFocus={()=>setFocus(f.k)}
                        onBlur={()=>setFocus(null)}
                        placeholder={f.pl}
                        style={{
                          width: "100%",
                          background: "transparent",
                          border: "none",
                          borderBottom: `1px solid ${focus===f.k?T.amber:`${T.cream}15`}`,
                          padding: "clamp(8px, 1.5vh, 12px) 0",
                          fontFamily:"Inter, sans-serif",
                          color: T.cream,
                          fontSize: "clamp(13px, 2.2vw, 14px)",
                          outline: "none",
                          transition: "border-color 0.3s",
                          boxSizing: "border-box"
                        }}/>
                    </div>
                  ))}
                </div>
                
                <div style={{ width: "100%" }}>
                  <div style={{
                    fontFamily:"Inter, sans-serif",
                    fontSize: "clamp(8px, 1.8vw, 9px)",
                    color: `${T.cream}35`,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    marginBottom: "clamp(4px, 1vh, 6px)"
                  }}>
                    Company / Startup (optional)
                  </div>
                  
                  <input
                    value={data.company}
                    onChange={e=>upd("company",e.target.value)}
                    onFocus={()=>setFocus("company")}
                    onBlur={()=>setFocus(null)}
                    placeholder="Acme Corp"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: `1px solid ${focus==="company"?T.amber:`${T.cream}15`}`,
                      padding: "clamp(8px, 1.5vh, 12px) 0",
                      fontFamily:"Inter, sans-serif",
                      color: T.cream,
                      fontSize: "clamp(13px, 2.2vw, 14px)",
                      outline: "none",
                      transition: "border-color 0.3s",
                      boxSizing: "border-box"
                    }}/>
                </div>
              </div>
            )}

            {step===4&&(
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(20px, 4vh, 28px)",
                width: "100%"
              }}>
                <div>
                  <h3 style={{
                    fontFamily:"Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
                    color: T.cream,
                    marginBottom: "clamp(4px, 1vh, 6px)",
                    letterSpacing: "-0.02em",
                    wordBreak: "break-word"
                  }}>
                    What's your timeline?
                  </h3>
                  
                  <p style={{
                    fontFamily:"Inter, sans-serif",
                    color: `${T.cream}35`,
                    fontSize: "clamp(12px, 2.2vw, 13px)"
                  }}>
                    Helps us confirm availability.
                  </p>
                </div>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
                  gap: "clamp(6px, 1.5vw, 8px)",
                  width: "100%"
                }}>
                  {TIMELINES.map(t=>(
                    <button key={t} onClick={()=>upd("timeline",t)} data-h
                      style={{
                        fontFamily:"Inter, sans-serif",
                        fontSize: "clamp(11px, 2vw, 12px)",
                        fontWeight: 600,
                        padding: "clamp(12px, 2vh, 16px) clamp(12px, 2vw, 16px)",
                        border: `1px solid ${data.timeline===t?T.amber:`${T.cream}12`}`,
                        background: data.timeline===t?`${T.amber}12`:"transparent",
                        color: data.timeline===t?T.amber:`${T.cream}40`,
                        cursor: "none",
                        textAlign: "left",
                        transition: "all 0.2s",
                        letterSpacing: "0.04em",
                        width: "100%",
                        whiteSpace: "nowrap"
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
                
                <div style={{ width: "100%" }}>
                  <div style={{
                    fontFamily:"Inter, sans-serif",
                    fontSize: "clamp(8px, 1.8vw, 9px)",
                    color: `${T.cream}35`,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    marginBottom: "clamp(4px, 1vh, 6px)"
                  }}>
                    Anything else? (optional)
                  </div>
                  
                  <textarea
                    value={data.extra}
                    onChange={e=>upd("extra",e.target.value)}
                    onFocus={()=>setFocus("extra")}
                    onBlur={()=>setFocus(null)}
                    placeholder="Links to inspiration, competitors, or other context..."
                    rows={3}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: `1px solid ${focus==="extra"?T.amber:`${T.cream}15`}`,
                      padding: "clamp(8px, 1.5vh, 12px) 0",
                      fontFamily:"Inter, sans-serif",
                      color: T.cream,
                      fontSize: "clamp(13px, 2.2vw, 14px)",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.3s",
                      boxSizing: "border-box"
                    }}/>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div style={{
                padding: "clamp(12px, 2vh, 16px)",
                background: `${T.amber}10`,
                border: `1px solid ${T.amber}30`,
                color: T.amber,
                fontFamily:"Inter, sans-serif",
                fontSize: "clamp(11px, 2vw, 12px)",
                marginBottom: "clamp(16px, 3vh, 20px)",
                borderRadius: "4px"
              }}>
                {error}
              </div>
            )}

            {/* Nav buttons */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "clamp(24px, 5vh, 36px)",
              paddingTop: "clamp(20px, 3vh, 28px)",
              borderTop: `1px solid ${T.cream}08`,
              gap: "clamp(12px, 3vw, 24px)",
              flexWrap: "wrap"
            }}>
              <button
                onClick={()=>step>1&&setStep(s=>s-1)}
                data-h
                style={{
                  opacity: step===1?0:1,
                  pointerEvents: step===1?"none":"auto",
                  fontFamily:"Inter, sans-serif",
                  fontSize: "clamp(11px, 2vw, 12px)",
                  color: `${T.cream}35`,
                  background: "none",
                  border: "none",
                  cursor: "none",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  transition: "color 0.2s",
                  padding: "8px 0"
                }}
                onMouseEnter={e=>e.currentTarget.style.color=`${T.cream}65`}
                onMouseLeave={e=>e.currentTarget.style.color=`${T.cream}35`}>
                ← Back
              </button>
              
              <button
                onClick={()=>canNext()&&(step<4?setStep(s=>s+1):handleSubmit())}
                disabled={submitting}
                data-h
                style={{
                  background: canNext()&&!submitting?T.amber:`${T.cream}10`,
                  color: canNext()&&!submitting?T.ink:`${T.cream}20`,
                  fontFamily:"Inter, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(10px, 2vw, 11px)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "clamp(12px, 2vh, 16px) clamp(20px, 4vw, 32px)",
                  border: "none",
                  cursor: submitting?"none":"none",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px, 2vw, 12px)",
                  whiteSpace: "nowrap",
                  opacity: submitting?0.6:1
                }}
                onMouseEnter={e=>{if(canNext()&&!submitting){e.currentTarget.style.background=T.cream; e.currentTarget.style.color=T.ink;}}}
                onMouseLeave={e=>{if(canNext()&&!submitting){e.currentTarget.style.background=T.sand; e.currentTarget.style.color=T.cream;}}}>
                {submitting?"Sending...":step===4?"Send Brief ":"Continue "}<span style={{fontSize:"clamp(14px, 3vw, 16px)"}}>{!submitting&&"→"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}