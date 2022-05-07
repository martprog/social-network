import User from "./user";
import Counter from "./counter";


export default function HelloWorld() {
    
    return (
        <>
            <section>
                <div>Hello, World!</div>
                <User username="cebrex"/>
            </section>
            <Counter />
        </>
    );
}
