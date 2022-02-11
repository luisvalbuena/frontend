
import React, {useState, useEffect} from 'react'

//const API = process.env.REACT_APP_API
const API = process.env.REACT_APP_API

export default function Users (){

    const[name, setName]=useState('')

    const[email, setEmail]=useState('')

    const[password, setPassword]=useState('')

    const[users, setUsers]= useState([])

    const [editing, setEditing]=useState(false)
    const [id, setId]=useState('false')

    const handdleSubmit = async (e)=>{
        e.preventDefault()
        if (!editing){
            const res = await fetch(`${API}/users`,
                
                {
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({                    
                        name,
                        email,
                        password}

                    )
                }
            )
            const data = await res.json()
            console.log(data)            
        } else {
            const res = await (`${API}/users/${id}`,{
                method: 'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
           const data = await res.json()
           console.log(data)
           setEditing(false)
           setId('')

        }


        await getUsers()
        setName('')
        setEmail('')
        setPassword('')
    }

    const getUsers = async ()=>{
        const res = await fetch(`${API}/users`)
        const data = res.json()
        setUsers(data)
    }
    
    useEffect(()=>{
        getUsers()
    },[])

    const deleteUser = async (id)=>{
        const userResponse = window.confirm('are you sure?')
        if(userResponse){
            const res = await fetch(`${API}/users/${id}`, {
                method: 'DELETE'
            })
            const data = res.json()
            console.log(data)
            getUsers()
        }
    }
    const editUser= async (id)=>{
        const res = await fetch(`${API}/users/${id}`)
        const data = res.json()
        console.log(data)
        setEditing(true)
        setId(id)
        setName(data.name)
        setName(data.email)
        setName(data.password)
    }
    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handdleSubmit} className="card card-body">
                    <div className="form-group">
                        <input type="text" onChange={e=>setName(e.target.value)} value={name}
                            className="form-control"
                            placeholder='name'
                            autoFocus
                        />

                    </div>
                    <div className="form-group">
                        <input type="text" onChange={e=>setEmail(e.target.value)} value={email}
                            className="form-control"
                            placeholder='email'
                        />

                    </div>
                    <div className="form-group">
                        <input type="text" onChange={e=>setPassword(e.target.value)} value={password}
                            className="form-control"
                            placeholder='password'
                        />

                    </div>

                    <button className="btn btn-primary btn-block">
                        {editing ? 'Update' : 'Create'}
                    </button>
                        
                </form>
            </div>
            <div className="col-md-8">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(
                            user=>(
                                <tr key={user._id}>

                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>                               
                                    <button className="btn btn-secondary btn-sm btn-nlock"
                                        onClick={()=> deleteUser(user._id)}
                                    >EDIT</button>                               
                                    <button className="btn btn-danger btn-sm btn-nlock"
                                        onClick={()=> editUser(user._id)}
                                    >DELETE</button>
                                </td>                                
                                 </tr>


                                )
                            )                          
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}