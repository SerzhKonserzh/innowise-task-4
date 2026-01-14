import{j as i,a as n,c as o,C as l,B as d}from"./index-CxYb_ZqI.js";import{u as p}from"./useQuery-aqoplsDs.js";import{a as g}from"./index-B9ygI19o.js";const h=g.create({baseURL:"/api/graphql",timeout:1e4,headers:{"Content-Type":"application/json"}}),m=async(e,t={})=>{try{const s=await h.post("",{query:e,variables:t});if(s.data.errors?.length)throw new Error(s.data.errors[0]?.message||"GraphQL error");return s.data.data??{}}catch(s){throw console.error("GraphQL request failed:",s.response?.data||s.message||s),s}},u=`
  query GetAllFilms {
    allFilms {
      films {
        id
        title
        episodeID
        openingCrawl
        director
        producers
        releaseDate
      }
    }
  }
`,$=()=>{const{data:e,isLoading:t,error:s,refetch:c}=p({queryKey:["films"],queryFn:()=>m(u),placeholderData:{allFilms:{films:[]}}});return i("div",{css:r=>o`
				background-color: ${r.colors.backgroundSecondary};
				padding: ${r.spacing(3)} 0;
			`,children:n(l,{children:[i("h1",{css:r=>o`
						margin: 0 0 ${r.spacing(3)} 0;
						font-size: ${r.typography.fontSize["3xl"]};
						color: ${r.colors.textPrimary};
					`,children:"Star Wars GraphQL Data"}),t?i("div",{css:r=>o`
						text-align: center;
						padding: ${r.spacing(4)};
					`,children:"Loading films..."}):s?n("div",{css:r=>o`
						text-align: center;
						padding: ${r.spacing(4)};
					`,children:[n("p",{children:["Error loading films: ",s.message]}),i(d,{onClick:()=>c(),variant:"primary",children:"Try again"})]}):e?.allFilms?.films?i("div",{css:r=>o`
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
					gap: ${r.spacing(3)};
					margin-top: ${r.spacing(3)};
				`,children:e.allFilms.films.map(r=>n("div",{css:a=>o`
							background-color: ${a.colors.backgroundCard};
							border: 1px solid ${a.colors.border};
							border-radius: ${a.borderRadius.card};
							padding: ${a.spacing(3)};
							box-shadow: ${a.shadows.card};
							transition: all 0.2s ease-in-out;
							
							&:hover {
								transform: translateY(-2px);
								box-shadow: ${a.shadows.hover};
							}
						`,children:[n("h3",{css:a=>o`
								margin-top: 0;
								font-size: ${a.typography.fontSize.xl};
								color: ${a.colors.textPrimary};
							`,children:[r.title," (Episode ",r.episodeID,")"]}),n("p",{css:a=>o`
								margin: ${a.spacing(1)} 0;
								color: ${a.colors.textSecondary};
							`,children:[i("strong",{children:"Director:"})," ",r.director]}),n("p",{css:a=>o`
								margin: ${a.spacing(1)} 0;
								color: ${a.colors.textSecondary};
							`,children:[i("strong",{children:"Release Date:"})," ",new Date(r.releaseDate).toLocaleDateString()]}),n("p",{css:a=>o`
								margin: ${a.spacing(1)} 0 0 0;
								color: ${a.colors.textPrimary};
								line-height: 1.5;
							`,children:[i("strong",{children:"Opening Crawl:"})," ",r.openingCrawl]})]},r.id))}):i("div",{css:r=>o`
						text-align: center;
						padding: ${r.spacing(4)};
					`,children:"No films data"})]})})},w=$;export{w as component};
