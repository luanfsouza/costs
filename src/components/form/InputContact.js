import styles from './InputContact.module.css'
function InputContact({type,text,name,handleOnChange,value}){
    return (
      <div className={styles.inputbox}>
        <input
          type={type}
          name={name}
          id={name}
          onChange={handleOnChange}
          value={value} required
        />
        <label htmlFor={name}>{text}:</label>
      </div>
    );
}
export default InputContact