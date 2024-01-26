import { useEffect, useState } from "react";

export const MakerForm = ({defaultValuesMakerForm, makerSelected, handlerCreateMaker}) => {
    
    const [makerForm, setMakerForm] = useState(defaultValuesMakerForm);

    const {id, name, lastName, email} = makerForm;

    useEffect(() =>{
        setMakerForm({
            ...makerSelected
        })
    }, [makerSelected])

    const onInputChange = ({ target }) => {
        // console.log(target.value);
        const {name, value} = target;
        setMakerForm({
            ...makerForm,
            [name]:value,
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        // console.log(makerForm);

        handlerCreateMaker(makerForm);
        setMakerForm(defaultValuesMakerForm);
    }

    return (
    <>
        <div className="card my-3">
            <div className="card-header">
                Crear una Maker
            </div>
            <div className="card-body">
                <form onSubmit={onSubmit} className="row g-4">
                    <div className="col-auto" id="div-name">
                        <input 
                        type="text" 
                        name="name" 
                        placeholder="Name"
                        value={name}
                        className="form-control" 
                        autoComplete="off"
                        onChange={ onInputChange }/>
                    </div>
                    <div className="col-auto">
                        <input 
                        type="text" 
                        name="lastName" 
                        placeholder="Last Name"
                        value={lastName}
                        className="form-control"
                        autoComplete="off"
                        onChange={ onInputChange }/>
                    </div>
                    <div className="col-auto" id="div-email">
                        <input 
                        type="text" 
                        name="email" 
                        placeholder="Email"
                        value={email}
                        className="form-control" 
                        autoComplete="off"
                        onChange={ onInputChange }/>
                    </div>
                    <div className="col-auto" id="div-email">
                        <input 
                        type="hidden" 
                        name="id" 
                        value={id}/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
}