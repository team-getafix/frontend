"use client" // TODO: remove this

import MultipleSelect from "@/components/MultipleSelect"

export default function NewSubject() {
    return (
        <div className="flex items-center justify-center w-screen h-screen text-xl" suppressHydrationWarning>
            <form>
                <div className="mb-4">
                    <label className="font-semibold">
                        Subject name
                    </label>
                    <input id="name" name="name" className="shadow border rounded w-full pl-2" placeholder="Subject Name" ></input>
                </div>
                <div className="mb-4">
                    <label className="font-semibold">
                        Teachers
                    </label>
                    <MultipleSelect options={ [{'value': 'value1', 'label': 'option1'}, {'value': 'value2', 'label': 'option2'}] }/>
                </div>

                <div className="mb-4">
                    <button className="shadow border rounded-full bg-blue-500 text-white px-4 py-1" type="submit">
                        Create
                    </button>
                </div>
            </form>

            
        </div>

        
    )
}