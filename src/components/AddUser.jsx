import React from 'react'

const AddUser = ({ onAdd }) => {

    // handle submit function
    const handleOnSubmit = (e) => {
        e.preventDefault();
        onAdd(e.target.name.value);
        e.target.name.value = "";


    }

    return (
        <div className='list center'>
            <form onSubmit={handleOnSubmit}>
                <h1>Manage Your Tasks Efficiently</h1>
                <input placeholder='Enter Your Task Here' name='name' required />
                <button onSubmit={handleOnSubmit}>Add</button>
            </form>
        </div>
    )
}

export default AddUser