import { useReducer, useState } from "react";
import { MakerForm } from "./components/MakerForm";
import { MakersList } from "./components/MakersList";
import { makersReducers } from "./reducers/makersReducer";
import Swal from "sweetalert2";
import { findAll, remove, save, update } from "./services/makerService";

const initialMakers = []

const defaultValuesMakerForm = {
    id: 0,
    name: "",
    lastName: "",
    email: "",
}
export const MakerApp = () => {


    const getAllMakers = async () => {
        const result = await findAll();
        console.log(result);
        dispatch({
            type: 'loadingMakers',
            payload: result.data,
        })
    }

    const [makers, dispatch] = useReducer(makersReducers, initialMakers);
    const [makerSelected, setMakerSelected] = useState(defaultValuesMakerForm);

    const handlerCreateMaker = async(maker) => {
        if (!maker.name || !maker.lastName || !maker.email) {
            Swal.fire({
                icon: "error",
                title: "Ooops...",
                text: "Todos los campos son requeridos."
            });
        } else {
            let response;
            let type;
            let textType;
            if (maker.id === 0) {
                response = await save(maker);
                type = 'addMaker';
                textType = 'creado'
            } else {
                response = await update(maker);
                type = 'updateMaker';
                textType = 'actualizado'
            }
            dispatch({
                type,
                payload: response.data
            });
            Swal.fire({
                title: "El usuario ha sido " + textType + " con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handlerRemoveMaker = (id) => {
        Swal.fire({
            title: "¿Seguro deseas eliminar?",
            text: "Esta acción no se podrá revertir.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                remove(id);
                dispatch({
                    type: 'removeMaker',
                    payload: id,
                });
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "La maker ha sido eliminada.",
                    icon: "success"
                });
            }
        });
    }

    const handlerMakerSelectedForm = (maker) => {
        setMakerSelected({ ...maker });
    }

    return (
        <>
            <div className="container">
                <div className="card my-3">
                    <div className="card-header">
                        MAKER APP
                    </div>
                    <div className="card-body">
                        <MakerForm
                            defaultValuesMakerForm={defaultValuesMakerForm}
                            makerSelected={makerSelected}
                            handlerCreateMaker={handlerCreateMaker}
                        />
                        <MakersList
                            getAllMakers={getAllMakers}
                            handlerMakerSelectedForm={handlerMakerSelectedForm}
                            handlerRemoveMaker={handlerRemoveMaker}
                            makers={makers}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}