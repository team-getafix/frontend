export default function NewUser() {
    function createUser(formData) {
        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDAxNTkzMzQsImV4cCI6MTc0MDE2MjkzNH0.UcGuStFBDtiI0tbJBnERv-OJiZJkFHv4YJiBpbiDD5s');

        const response = fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                email: formData.get('email'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                role: formData.get('role')

            }),
        }).then(response => {
            if (response.ok) {
                alert(`${formData.get('role')} ${formData.get('firstName')} ${formData.get('lastName')} created successfully`);
            } else { // TODO: not clear message
                const errorData = response.status;
                console.error(errorData);
                alert(errorData);
            }
        }).catch(error => {
            console.error(error);
            alert(error);
        });
    }

    return (
        <form action={createUser}>
                <div className="mb-4">
                    <label>
                        Email
                    </label>
                    <input id="email" name="email" className="shadow border rounded w-full pl-2" placeholder="example@example.com" ></input>
                </div>
                {/* <div className="mb-4">
                    <label>
                        Password
                    </label>
                    <input id="password" name="password" className="shadow border rounded w-full" placeholder="********" type="password"></input>
                </div> */}

                <div className="mb-4">
                    <label>
                        First Name
                    </label>
                    <input id="firstName" name="firstName" className="shadow border rounded w-full pl-2" placeholder="John"></input>
                </div>
                <div className="mb-4">
                    <label>
                        Last Name
                    </label>
                    <input id="lastName" name="lastName" className="shadow border rounded w-full pl-2" placeholder="Doe"></input>
                </div>
                <div className="mb-4">
                    <label>
                        Role
                    </label>
                    <select id="role" name="role" className="shadow border rounded w-full pl-1">
                        <option value="student" defaultValue>Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="mb-4">
                    <button className="shadow border rounded-full bg-blue-500 text-white px-4 py-1" type="submit">
                        Create
                    </button>
                </div>
            </form>
    )
}