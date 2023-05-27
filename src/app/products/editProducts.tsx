'use client'
import {SyntheticEvent ,useState} from 'react'
import { useRouter } from 'next/navigation'

type Products = {
    id: number,
    title: string,
    price: number
}

export default function EditProduct(product: Products) {
    const [toggle, setToggle] = useState(false)
    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [editing, isEditing] = useState(false)
    const router = useRouter()

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleEdit = async (e: SyntheticEvent) => {
        e.preventDefault()
        isEditing(true)
        await fetch(`http://localhost:5000/products/${product.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price
            })
        })
        isEditing(false)
        router.refresh()
        setToggle(false)
    }


  return (
    <div>
        <button className="btn" onClick={handleToggle}>Edit</button>
        <input type="checkbox" checked={toggle} onChange={handleToggle} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit {product.title}</h3>
                <form onSubmit={handleEdit}>
                    <div className="form-control">
                        <label className="label font-bold">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="Product Name"/>
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Price</label>
                        <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input w-full input-bordered" placeholder="Price"/>
                    </div>
                    <div className="modal-action">
                        <button type="button" onClick={handleToggle} className="btn">Close</button>
                        {editing ? <button type="button" className="btn loading">Saving...</button> : <button type="submit" className="btn btn-primary">Save</button>}
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
