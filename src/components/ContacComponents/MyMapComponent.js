
const MyMapComponent = () => {
    
    return (
        <div className="mymaps">
            <iframe
                className="mymapsframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2306.2720172305776!2d25.281846800000004!3d54.6872407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd94105d30ce8f%3A0xe906c27f2519bbaf!2sGedimino%20pr.%209%2C%2001105%20Vilnius!5e0!3m2!1sen!2slt!4v1692339117475!5m2!1sen!2slt"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="My Google Map"
            />
        </div>
    );
  };
  
  export default MyMapComponent;