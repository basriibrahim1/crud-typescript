'use client'
import {SyntheticEvent ,useState} from 'react'
import { useRouter } from 'next/navigation'

export default function AddProduct() {
    const [toggle, setToggle] = useState(false)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [saving, isSaving] = useState(false)
    const router = useRouter()

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        isSaving(true)
        await fetch('http://localhost:5000/products',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price
            })
        })
        isSaving(false)
        setTitle('')
        setPrice('')
        router.refresh()
        setToggle(false)
    }


  return (
    <div>
        <button className="btn" onClick={handleToggle}>Add New Product</button>
        <input type="checkbox" checked={toggle} onChange={handleToggle} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add New Product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label font-bold">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="Product Name"/>
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Price</label>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="input w-full input-bordered" placeholder="Price"/>
                    </div>
                    <div className="modal-action">
                        <button type="button" onClick={handleToggle} className="btn">Close</button>
                        {saving ? <button type="button" className="btn loading">Saving...</button> : <button type="submit" className="btn btn-primary">Save</button>}
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
