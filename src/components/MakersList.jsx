import { useEffect } from "react"

export const MakersList = ({ getAllMakers, handlerMakerSelectedForm, handlerRemoveMaker, makers = [] }) => {

    useEffect(() => {
        makers = getAllMakers();
    }, []);

    return (
        <>  { makers.length === 0
            ? <div className="alert alert-warning"> Aún no se han agregado makers :C</div>
            : <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>LAST NAME</th>
                        <th>EMAIL</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        makers.map(maker => (
                            <tr key={maker.id}>
                                <td>{maker.name}</td>
                                <td>{maker.lastName}</td>
                                <td>{maker.email}</td>
                                <td>
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-warning btn-sm mx-1"
                                            onClick={() => handlerMakerSelectedForm(maker)}>
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm mx-1"
                                            onClick={() => handlerRemoveMaker(maker.id)}>
                                            Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        }
        </>
    )
}