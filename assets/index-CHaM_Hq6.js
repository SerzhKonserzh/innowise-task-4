import{i as Q,h as U,d as _,S as D,n as k,s as G,e as H,f as W,r as p,g as K,R as V,j as o,a as v,c as l,L as Y,C as O,B,F as M}from"./index-tqrLPJJr.js";import{Q as E,a as J,b as X,e as Z,c as ee,d as se,s as F,f as q,w as te,g as re,h as ie,u as ne}from"./useQuery-DcWPpCbD.js";import{a as oe,b as ae,c as ce,d as le}from"./client-f9aEGNiY.js";import"./index-B9ygI19o.js";var ue=class extends E{constructor(t,s){super(t,s)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(t){super.setOptions({...t,behavior:Q()})}getOptimisticResult(t){return t.behavior=Q(),super.getOptimisticResult(t)}fetchNextPage(t){return this.fetch({...t,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(t){return this.fetch({...t,meta:{fetchMore:{direction:"backward"}}})}createResult(t,s){const{state:r}=t,n=super.createResult(t,s),{isFetching:e,isRefetching:a,isError:u,isRefetchError:f}=n,d=r.fetchMeta?.fetchMore?.direction,m=u&&d==="forward",c=e&&d==="forward",h=u&&d==="backward",x=e&&d==="backward";return{...n,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:_(s,r.data),hasPreviousPage:U(s,r.data),isFetchNextPageError:m,isFetchingNextPage:c,isFetchPreviousPageError:h,isFetchingPreviousPage:x,isRefetchError:f&&!m&&!h,isRefetching:a&&!c&&!x}}};function L(t,s){const r=new Set(s);return t.filter(n=>!r.has(n))}function de(t,s,r){const n=t.slice(0);return n[s]=r,n}var he=class extends D{#r;#e;#i;#n;#s;#t;#o;#a;#c=[];constructor(t,s,r){super(),this.#r=t,this.#n=r,this.#i=[],this.#s=[],this.#e=[],this.setQueries(s)}onSubscribe(){this.listeners.size===1&&this.#s.forEach(t=>{t.subscribe(s=>{this.#h(t,s)})})}onUnsubscribe(){this.listeners.size||this.destroy()}destroy(){this.listeners=new Set,this.#s.forEach(t=>{t.destroy()})}setQueries(t,s){this.#i=t,this.#n=s,k.batch(()=>{const r=this.#s,n=this.#d(this.#i);this.#c=n,n.forEach(c=>c.observer.setOptions(c.defaultedQueryOptions));const e=n.map(c=>c.observer),a=e.map(c=>c.getCurrentResult()),u=r.length!==e.length,f=e.some((c,h)=>c!==r[h]),d=u||f,m=d?!0:a.some((c,h)=>{const x=this.#e[h];return!x||!G(c,x)});!d&&!m||(d&&(this.#s=e),this.#e=a,this.hasListeners()&&(d&&(L(r,e).forEach(c=>{c.destroy()}),L(e,r).forEach(c=>{c.subscribe(h=>{this.#h(c,h)})})),this.#g()))})}getCurrentResult(){return this.#e}getQueries(){return this.#s.map(t=>t.getCurrentQuery())}getObservers(){return this.#s}getOptimisticResult(t,s){const r=this.#d(t),n=r.map(e=>e.observer.getOptimisticResult(e.defaultedQueryOptions));return[n,e=>this.#u(e??n,s),()=>this.#l(n,r)]}#l(t,s){return s.map((r,n)=>{const e=t[n];return r.defaultedQueryOptions.notifyOnChangeProps?e:r.observer.trackResult(e,a=>{s.forEach(u=>{u.observer.trackProp(a)})})})}#u(t,s){return s?((!this.#t||this.#e!==this.#a||s!==this.#o)&&(this.#o=s,this.#a=this.#e,this.#t=H(this.#t,s(t))),this.#t):t}#d(t){const s=new Map;this.#s.forEach(n=>{const e=n.options.queryHash;if(!e)return;const a=s.get(e);a?a.push(n):s.set(e,[n])});const r=[];return t.forEach(n=>{const e=this.#r.defaultQueryOptions(n),u=s.get(e.queryHash)?.shift()??new E(this.#r,e);r.push({defaultedQueryOptions:e,observer:u})}),r}#h(t,s){const r=this.#s.indexOf(t);r!==-1&&(this.#e=de(this.#e,r,s),this.#g())}#g(){if(this.hasListeners()){const t=this.#t,s=this.#l(this.#e,this.#c),r=this.#u(s,this.#n?.combine);t!==r&&k.batch(()=>{this.listeners.forEach(n=>{n(this.#e)})})}}};function ge({queries:t,...s},r){const n=W(),e=J(),a=X(),u=p.useMemo(()=>t.map(g=>{const y=n.defaultQueryOptions(g);return y._optimisticResults=e?"isRestoring":"optimistic",y}),[t,n,e]);u.forEach(g=>{Z(g),ee(g,a)}),se(a);const[f]=p.useState(()=>new he(n,u,s)),[d,m,c]=f.getOptimisticResult(u,s.combine),h=!e&&s.subscribed!==!1;p.useSyncExternalStore(p.useCallback(g=>h?f.subscribe(k.batchCalls(g)):K,[f,h]),()=>f.getCurrentResult(),()=>f.getCurrentResult()),p.useEffect(()=>{f.setQueries(u,s)},[u,s,f]);const P=d.some((g,y)=>F(u[y],g))?d.flatMap((g,y)=>{const b=u[y];if(b){const w=new E(n,b);if(F(b,g))return q(b,w,a);te(g,e)&&q(b,w,a)}return[]}):[];if(P.length>0)throw Promise.all(P);const R=d.find((g,y)=>{const b=u[y];return b&&re({result:g,errorResetBoundary:a,throwOnError:b.throwOnError,query:n.getQueryCache().get(b.queryHash),suspense:b.suspense})});if(R?.error)throw R.error;return m(c())}function pe(t,s){return ie(t,ue)}const fe=V.memo(({post:t,user:s})=>{const n=t.body.length>250?t.body.slice(0,250)+"…":t.body;return o("article",{css:e=>l`
				background-color: ${e.colors.backgroundCard};
				border: 1px solid ${e.colors.border};
				border-radius: ${e.borderRadius.card};
				padding: ${e.components.card.padding};
				margin-bottom: ${e.spacing(2)};
				transition: all 0.2s ease-in-out;
				box-shadow: ${e.shadows.card};
				
				&:hover {
					transform: translateY(-2px);
					box-shadow: ${e.shadows.hover};
				}
			`,children:v(Y,{to:"/post/$postId",params:{postId:t.id.toString()},css:l`
					text-decoration: none;
					color: inherit;
				`,children:[v("div",{css:e=>l`
						display: flex;
						gap: ${e.spacing(2)};
						margin-bottom: ${e.spacing(2)};
						align-items: center;
					`,children:[o("img",{css:l`
							width: 40px;
							height: 40px;
							border-radius: 50%;
							object-fit: cover;
						`,src:s?.image||"/default-avatar.png",alt:s?.username||"User"}),o("div",{children:o("p",{css:e=>l`
								margin: 0;
								color: ${e.colors.textPrimary};
								font-weight: ${e.typography.fontWeight.semibold};
							`,children:s?.username||"Unknown user"})})]}),v("div",{children:[o("h2",{css:e=>l`
							margin: 0 0 ${e.spacing(1)} 0;
							color: ${e.colors.textPrimary};
							font-size: ${e.typography.fontSize.xl};
						`,children:t.title}),o("div",{css:e=>l`
							margin: 0 0 ${e.spacing(2)} 0;
							display: flex;
							gap: ${e.spacing(1)};
							flex-wrap: wrap;
						`,children:t.tags.map(e=>o("span",{css:a=>l`
									background-color: ${a.colors.backgroundTertiary};
									color: ${a.colors.textSecondary};
									padding: 2px 8px;
									border-radius: ${a.borderRadius.full};
									font-size: ${a.typography.fontSize.sm};
								`,children:"#"+e},e))}),o("div",{css:e=>l`
							color: ${e.colors.textPrimary};
							line-height: 1.6;
							margin-bottom: ${e.spacing(2)};
						`,children:n}),v("div",{css:e=>l`
							display: flex;
							gap: ${e.spacing(3)};
							color: ${e.colors.textTertiary};
							font-size: ${e.typography.fontSize.sm};
						`,children:[v("span",{children:["👍 ",t.reactions.likes]}),v("span",{children:["👎 ",t.reactions.dislikes]}),v("span",{children:["👁️ ",t.views]})]})]})]})})}),be=(t,s,r)=>{const n=p.useRef(null),e=p.useRef(null);return p.useEffect(()=>{if(!(r||!s))return n.current=new IntersectionObserver(a=>{a[0]?.isIntersecting&&t()}),e.current&&n.current.observe(e.current),()=>{n.current&&n.current.disconnect()}},[t,s,r]),e},S=({options:t,...s})=>o("select",{...s,css:r=>l`
        padding: ${r.spacing(1)} ${r.spacing(1.5)};
        border-radius: ${r.borderRadius.medium};
        border: 1px solid ${r.colors.border};
        background-color: ${r.colors.backgroundCard};
        color: ${r.colors.textPrimary};
        font-size: ${r.typography.fontSize.sm};
        min-width: 120px;
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 8px center;
        background-size: 16px;
        padding-right: 32px;
        
        &:focus {
          outline: none;
          border-color: ${r.colors.accent};
          box-shadow: ${r.shadows.focus};
        }
        
        &:hover {
          border-color: ${r.colors.textTertiary};
        }
        
        option {
          background-color: ${r.colors.backgroundCard};
          color: ${r.colors.textPrimary};
          
          &:hover {
            background-color: ${r.colors.backgroundSecondary};
          }
          
          &:checked {
            background-color: ${r.colors.accent};
            color: ${r.colors.textInverse};
          }
        }
      `,children:t.map(r=>o("option",{value:r.value,children:r.label},r.value))});function ve(){const[s,r]=p.useState({selectedTag:"",sortBy:"title",sortOrder:"asc"}),[n,e]=p.useState([]),{data:a}=ne({queryKey:["tags"],queryFn:ae,staleTime:1e3*60*5});p.useEffect(()=>{a&&e(a)},[a]);const u=()=>{r({selectedTag:"",sortBy:"title",sortOrder:"asc"})},f=async({pageParam:i=0})=>s.selectedTag?ce(s.selectedTag,10,i,s.sortBy,s.sortOrder):le(10,i,s.sortBy,s.sortOrder),{data:d,fetchNextPage:m,hasNextPage:c,isFetchingNextPage:h,isFetching:x,isLoading:P,isError:R,refetch:g}=pe({queryKey:["posts",s.sortBy,s.sortOrder,s.selectedTag],queryFn:f,getNextPageParam:(i,$)=>{const T=$.reduce((A,j)=>A+j.posts.length,0);return T<i.total?T:void 0},initialPageParam:0}),y=P&&!d,b=h||x&&!P,w=p.useMemo(()=>d?.pages.flatMap(i=>i.posts)??[],[d]),z=p.useMemo(()=>[...new Set(w.map(i=>i.userId))],[w]),C=ge({queries:z.filter(i=>i!=null).map(i=>({queryKey:["user",i],queryFn:()=>oe(i),staleTime:1e3*60*5,gcTime:1e3*60*10}))}).map(i=>i.data).filter(Boolean),N=p.useMemo(()=>{const i={};return C.forEach($=>{i[$.id]=$}),i},[C]),I=be(()=>{c&&!h&&m()},c,h);return P&&!d?o(O,{children:o("div",{css:i=>l`
						text-align: center;
						padding: ${i.spacing(4)};
					`,children:"Loading..."})}):R?o(O,{children:v("div",{css:i=>l`
						text-align: center;
						padding: ${i.spacing(4)};
					`,children:["Failed to load posts.",o(B,{onClick:()=>g(),variant:"primary",size:"medium",css:i=>l`
							display: block;
							margin: ${i.spacing(2)} auto 0;
						`,children:"Try again"})]})}):w.length?o(M,{children:v(O,{children:[v("div",{css:i=>l`
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: ${i.spacing(3)};
						flex-wrap: wrap;
						gap: ${i.spacing(2)};
					`,children:[o("h1",{css:i=>l`
							margin: 0;
							font-size: ${i.typography.fontSize["3xl"]};
						`,children:"Posts"}),v("div",{css:i=>l`
							display: flex;
							gap: ${i.spacing(1)};
							flex-wrap: wrap;
							align-items: center;
						`,children:[o(S,{value:s.sortBy,onChange:i=>r({...s,sortBy:i.target.value}),options:[{value:"id",label:"ID"},{value:"title",label:"Title"},{value:"views",label:"Views"},{value:"reactions",label:"Reactions"}]}),o(S,{value:s.sortOrder,onChange:i=>r({...s,sortOrder:i.target.value}),options:[{value:"asc",label:"Ascending"},{value:"desc",label:"Descending"}]}),o(S,{value:s.selectedTag,onChange:i=>r({...s,selectedTag:i.target.value}),options:[{value:"",label:"All Tags"},...n.map(i=>({value:i,label:i}))]}),o(B,{onClick:u,variant:"outline",size:"small",children:"Reset"})]})]}),y&&o("div",{css:i=>l`
							text-align: center;
							padding: ${i.spacing(4)};
						`,children:"Loading posts..."}),!y&&v(M,{children:[o("ul",{css:l`
								margin: 0;
								padding: 0;
							`,children:w.map(i=>o("li",{css:$=>l`
										list-style: none;
										margin-bottom: ${$.spacing(2)};
										&:last-child {
											margin-bottom: 0;
										}
									`,children:o(fe,{post:i,user:N[i.userId]||null})},i.id))}),o("div",{ref:I,css:l`
								height: 20px;
								margin: 20px 0;
							`}),b&&o("div",{css:i=>l`
									text-align: center;
									padding: ${i.spacing(2)};
									color: ${i.colors.textTertiary};
								`,children:"Loading more posts..."})]})]})}):o(O,{children:o("div",{css:i=>l`
						text-align: center;
						padding: ${i.spacing(4)};
					`,children:"No posts available."})})}const $e=ve;export{$e as component};
