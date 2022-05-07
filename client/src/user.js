export default function User(props){
    const displayName = props.username || 'No hay nombre';
    return (
        <p>USER {displayName}</p>
        // <p>USER {props.username} || 'No hay nombre' </p> otra opcion
    );
}

// you could also destructure props: ({ username })