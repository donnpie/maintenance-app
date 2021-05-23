import './Link.css';

const Link = (props) => {
    return (
        <div className="link-container">
            <a 
                href={props.href}
                target={props.target}
                rel={props.rel}
            >{props.title}</a>
        </div>
    );
}

export default Link;