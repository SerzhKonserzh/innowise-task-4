import{a as n,j as o,c as s,F as x,k as b,C as t}from"./index-tqrLPJJr.js";import{u as g}from"./useQuery-DcWPpCbD.js";import{e as f,g as h,a as m}from"./client-f9aEGNiY.js";import"./index-B9ygI19o.js";const v=({post:a,user:c,comments:e,commentsLoading:l,commentsError:p})=>n(x,{children:[n("article",{css:r=>s`
          background-color: ${r.colors.backgroundCard};
          border: 1px solid ${r.colors.border};
          border-radius: ${r.borderRadius.card};
          padding: ${r.spacing(4)};
          margin-bottom: ${r.spacing(3)};
          box-shadow: ${r.shadows.card};
        `,children:[n("div",{css:r=>s`
            display: flex;
            gap: ${r.spacing(2)};
            margin: 0 0 ${r.spacing(3)} 0;
            align-items: center;
          `,children:[o("img",{css:s`
              width: 50px;
              height: 50px;
              border-radius: 50%;
              object-fit: cover;
            `,src:c?.image||"/default-avatar.png",alt:c?.username||"User"}),n("div",{children:[o("h3",{css:r=>s`
                margin: 0 0 ${r.spacing(.5)} 0;
                color: ${r.colors.textPrimary};
              `,children:c?.username||"Unknown user"}),n("p",{css:r=>s`
                margin: 0;
                color: ${r.colors.textTertiary};
                font-size: ${r.typography.fontSize.sm};
              `,children:["Post ID: ",a.id]})]})]}),o("h1",{css:r=>s`
            margin: 0 0 ${r.spacing(2)} 0;
            color: ${r.colors.textPrimary};
            font-size: ${r.typography.fontSize["2xl"]};
          `,children:a.title}),o("div",{css:r=>s`
            margin: 0 0 ${r.spacing(3)} 0;
            display: flex;
            gap: ${r.spacing(1)};
            flex-wrap: wrap;
          `,children:a.tags.map(r=>n("span",{css:i=>s`
                background-color: ${i.colors.backgroundTertiary};
                color: ${i.colors.textSecondary};
                padding: 4px 12px;
                border-radius: ${i.borderRadius.full};
                font-size: ${i.typography.fontSize.sm};
              `,children:["#",r]},r))}),o("div",{css:r=>s`
            color: ${r.colors.textPrimary};
            line-height: 1.7;
            margin: 0 0 ${r.spacing(3)} 0;
            font-size: ${r.typography.fontSize.base};
          `,children:a.body}),n("div",{css:r=>s`
            display: flex;
            gap: ${r.spacing(3)};
            color: ${r.colors.textTertiary};
            font-size: ${r.typography.fontSize.sm};
            padding-top: ${r.spacing(2)};
            border-top: 1px solid ${r.colors.border};
          `,children:[n("span",{children:["👍 ",a.reactions.likes]}),n("span",{children:["👎 ",a.reactions.dislikes]}),n("span",{children:["👁️ ",a.views]})]})]}),n("section",{css:r=>s`
          background-color: ${r.colors.backgroundCard};
          border: 1px solid ${r.colors.border};
          border-radius: ${r.borderRadius.card};
          padding: ${r.spacing(4)};
          box-shadow: ${r.shadows.card};
        `,children:[n("h2",{css:r=>s`
            margin: 0 0 ${r.spacing(3)} 0;
            color: ${r.colors.textPrimary};
            font-size: ${r.typography.fontSize.xl};
          `,children:["Comments (",e.length,")"]}),l?o("div",{css:r=>s`
              text-align: center;
              padding: ${r.spacing(4)};
              color: ${r.colors.textTertiary};
            `,children:"Loading comments..."}):p?o("div",{css:r=>s`
              text-align: center;
              padding: ${r.spacing(4)};
              color: ${r.colors.error};
            `,children:"Failed to load comments."}):e.length===0?o("div",{css:r=>s`
              text-align: center;
              padding: ${r.spacing(4)};
              color: ${r.colors.textTertiary};
            `,children:"No comments yet."}):o("ul",{css:s`
              list-style: none;
              padding: 0;
              margin: 0;
            `,children:e.map(r=>n("li",{css:i=>s`
                    padding: ${i.spacing(3)} 0;
                    border-bottom: 1px solid ${i.colors.border};
                    &:last-child {
                      border-bottom: none;
                    }
                  `,children:[o("p",{css:i=>s`
                      margin: 0 0 ${i.spacing(2)} 0;
                      color: ${i.colors.textPrimary};
                      line-height: 1.6;
                    `,children:r.body}),n("div",{css:s`
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    `,children:[n("span",{css:i=>s`
                        color: ${i.colors.textTertiary};
                        font-size: ${i.typography.fontSize.sm};
                      `,children:["@",r.user.username]}),n("span",{css:i=>s`
                        color: ${i.colors.textTertiary};
                        font-size: ${i.typography.fontSize.xs};
                      `,children:["Likes: ",r.likes]})]})]},r.id))})]})]});function z(){const{postId:a}=b({from:"/post/$postId"}),{data:c,isLoading:e,isError:l}=g({queryKey:["post",a],queryFn:()=>f(Number(a)),enabled:!!a}),{data:p,isLoading:r,isError:i}=g({queryKey:["comments",a],queryFn:()=>h(Number(a)),enabled:!!a}),{data:$,isLoading:y,isError:u}=g({queryKey:["user",c?.userId],queryFn:()=>m(Number(c?.userId)),enabled:!!c?.userId});return e||y?o(t,{children:o("div",{css:d=>s`
            text-align: center;
            padding: ${d.spacing(4)};
          `,children:"Loading post..."})}):l||u?o(t,{children:o("div",{css:d=>s`
            text-align: center;
            padding: ${d.spacing(4)};
          `,children:"Failed to load post."})}):c?o("div",{css:d=>s`
        padding: ${d.spacing(3)} 0;
      `,children:o(t,{children:o(v,{post:c,user:$||null,comments:p?.comments||[],commentsLoading:r,commentsError:i})})}):o(t,{children:o("div",{css:d=>s`
            text-align: center;
            padding: ${d.spacing(4)};
          `,children:"Post not found."})})}const I=z;export{I as component};
