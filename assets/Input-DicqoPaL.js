import{a,j as c,c as r,t as n}from"./index-tqrLPJJr.js";const l=({errorMessage:s,...i})=>a("div",{css:r`
				width: 100%;
				display: flex;
				flex-direction: column;
				gap: ${n.spacing(1)};
			`,children:[c("input",{...i,css:o=>r`
					width: 100%;
					padding: 0 ${o.spacing(2)};
					height: ${o.components.input.height};
					border: 1px solid ${o.colors.border};
					border-radius: ${o.borderRadius.medium};
					font-size: ${o.typography.fontSize.base};
					background: ${o.colors.backgroundSecondary};
					color: ${o.colors.textPrimary};
					transition: all 0.2s ease-in-out;

					&:focus {
						outline: none;
						border-color: ${o.colors.accent};
						box-shadow: ${o.shadows.focus};
					}
					
					&:hover {
						border-color: ${o.colors.textTertiary};
					}
					
					&::placeholder {
						color: ${o.colors.placeholder};
					}
					
					&:disabled {
						opacity: 0.6;
						cursor: not-allowed;
					}
				`}),s&&c("p",{css:o=>r`
						margin: 0;
						color: ${o.colors.error};
						font-size: ${o.typography.fontSize.sm};
					`,children:s})]});export{l as I};
