import { Link } from 'react-router-dom';

export default function LoginPage() {
    return (
        <div style={{maxWidth:"24em"}}>
        <label>El. paštas *</label>
        <input type="email" placeholder="El. paštas" className="p_input-field" required/>
        <label>Slaptažodis *</label>
        <input type="email" placeholder="Slaptažodis" className="p_input-field" required/>
        <input type="checkbox" id="iagree" value="Prisiminti mane"/>
        <label for="iagree">Prisiminti mane</label><br/>
        <input type="button" value="Prisijungti" className="p_button"/><br/>
        <Link to="#">Pamiršai slaptažodį?</Link><br/>

        
        </div>
    );
}