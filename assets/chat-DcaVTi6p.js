import{r as g,a as p,j as a,c as o,B as f,C as b}from"./index-tqrLPJJr.js";import{I as x}from"./Input-DicqoPaL.js";const y=t=>{const[n,i]=g.useState([]),[d,l]=g.useState(!1),s=g.useRef(null);return g.useEffect(()=>(s.current=new WebSocket(t),s.current.onopen=()=>{l(!0),console.log("WebSocket connected")},s.current.onmessage=e=>{try{console.log(e.data);const c=JSON.parse(e.data);c&&c.message&&i(u=>[...u,{id:Date.now().toString(),text:c.message,timestamp:new Date,sender:"other"}])}catch(c){console.error("Error parsing message:",c)}},s.current.onclose=()=>{l(!1),console.log("WebSocket disconnected")},s.current.onerror=e=>{console.error("WebSocket error:",e)},()=>{s.current?.close()}),[t]),{messages:n,isConnected:d,sendMessage:e=>{s.current?.readyState===WebSocket.OPEN&&(s.current.send(JSON.stringify({message:e})),i(c=>[...c,{id:Date.now().toString(),text:e,timestamp:new Date,sender:"user"}]))}}},h=({inputValue:t,isConnected:n,messages:i,onInputChange:d,onSend:l,onKeyPress:s})=>p("div",{css:o`
        display: flex;
        flex-direction: column;
        height: calc(100vh - 120px);
        max-width: 800px;
        margin: 0 auto;
      `,children:[p("div",{css:r=>o`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${r.spacing(2)} 0;
          border-bottom: 1px solid ${r.colors.border};
        `,children:[a("h1",{css:r=>o`
            margin: 0;
            font-size: ${r.typography.fontSize.xl};
            color: ${r.colors.textPrimary};
          `,children:"Chat"}),p("div",{css:r=>o`
            display: flex;
            align-items: center;
            gap: ${r.spacing(1)};
            font-size: ${r.typography.fontSize.sm};
            color: ${n?r.colors.success:r.colors.error};
          `,children:[a("span",{css:o`
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: ${n?"#4caf50":"#f44336"};
            `}),n?"Connected":"Disconnected"]})]}),p("div",{css:r=>o`
          flex: 1;
          overflow-y: auto;
          padding: ${r.spacing(2)};
          display: flex;
          flex-direction: column;
          background-color: ${r.colors.backgroundSecondary};
          gap: ${r.spacing(2)};
          
          /* Стилизация скроллбара */
          &::-webkit-scrollbar {
            width: 8px;
          }
          
          &::-webkit-scrollbar-track {
            background: ${r.colors.background};
            border-radius: 4px;
          }
          
          &::-webkit-scrollbar-thumb {
            background: ${r.colors.border};
            border-radius: 4px;
            
            &:hover {
              background: ${r.colors.textSecondary};
            }
          }
        `,children:[i.map(r=>a("div",{css:o`
              display: flex;
              justify-content: ${r.sender==="user"?"flex-end":"flex-start"};
            `,children:p("div",{css:e=>o`
                max-width: 70%;
                padding: ${e.spacing(1.5)};
                border-radius: ${e.borderRadius.medium};
                background-color: ${r.sender==="user"?e.colors.accent:e.colors.backgroundCard};
                color: ${r.sender==="user"?e.colors.textInverse:e.colors.textPrimary};
                word-wrap: break-word;
                box-shadow: ${e.shadows.card};
              `,children:[r.text,a("div",{css:e=>o`
                  font-size: ${e.typography.fontSize.xs};
                  color: ${r.sender==="user"?"rgba(255, 255, 255, 0.7)":e.colors.textTertiary};
                  text-align: right;
                  margin-top: ${e.spacing(.5)};
                `,children:r.timestamp.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})})]})},r.id)),a("div",{ref:r=>{r&&r.scrollIntoView({behavior:"smooth"})}})]}),p("div",{css:r=>o`
          display: flex;
          gap: ${r.spacing(1.5)};
          padding: ${r.spacing(2)} 0;
        `,children:[a(x,{value:t,onChange:r=>d(r.target.value),onKeyDown:s,placeholder:"Type a message...",disabled:!n,css:o`
            flex: 1;
          `}),a(f,{onClick:l,disabled:!n||!t.trim(),variant:"primary",children:"Send"})]})]}),$=()=>{const[t,n]=g.useState(""),{messages:i,isConnected:d,sendMessage:l}=y("wss://ws.ifelse.io"),s=()=>{t.trim()&&d&&(l(t),n(""))};return a(b,{children:a(h,{inputValue:t,isConnected:d,messages:i,onInputChange:n,onSend:s,onKeyPress:e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),s())}})})},k=$;export{k as component};
