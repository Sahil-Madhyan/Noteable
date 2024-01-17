import React from 'react'

function Alert(props) {
    const capitalize = (word) => {
        let newWord = word.toLowerCase();
        return newWord.charAt(0).toUpperCase() + newWord.slice(1);
    }
    return (
        props.alert && <div>
            {props.alert.type === "success" ? <div className={`alert alert-success alert-dismissible fade show`} role="alert">
                <i className="fa-sharp fa-solid fa-circle-check"></i>
                <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> : <div className={`alert alert-danger alert-dismissible fade show`} role="alert">
                <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                <strong>{capitalize(props.alert.type) === "Danger" ? "Error" : ""}</strong>: {props.alert.msg}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}

        </div>
    )
}

export default Alert
