import { Link } from 'react-router-dom';

export default function LoginPage() {
    return (
        <>
        <h3>el. paštas</h3>
        <input type="text"/>

        <h3>slaptažodis</h3>
        <input type="text"/>
        <input type="checkbox" value="Prisiminti mane"/>
        <input type="button" value="Prisijungti"/><br/>
        <input type="button" value="Registruotis"/><br/>
        <Link to="#">Pamiršai slaptažodį?</Link>
        </>
    );
}