import "./Loader.css"

export default ({ className, fill }) => (
  <svg className={className} version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    viewBox="0 0 100 100" enable-background="new 0 0 0 0">
    <circle fill="none" stroke={fill} stroke-width="4" cx="50" cy="50" r="44" style={{"opacity":"0.2"}}/>
      <circle fill="#fff" stroke={fill} stroke-width="3" cx="8" cy="54" r="6" >
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 48"
          to="360 50 52"
          repeatCount="indefinite" />
        
      </circle>
  </svg>
)