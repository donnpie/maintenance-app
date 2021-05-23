import './TextField.css';

const TextField = (props) => {
    return (
        <div className="textfield-container">
            <label className="textfield-label" 
                htmlFor=""
            >{props.label}</label>
            <input type="text" 
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default TextField