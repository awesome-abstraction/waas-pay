
export default ({ 
  objValue,
  onChange,
  onRemove,
  index
}) => {
  const { label, type, placeholder, value } = objValue;
  return (
    <div className={"input-contain"}>
      <input value={value} className={"ssn-input"} placeholder={placeholder} label={label} type={type} onChange={(e) => onChange(e, index)}/>
      <div onClick={() => onRemove(index)} className={"minus-button"}>-</div>
    </div>
      
  )
}