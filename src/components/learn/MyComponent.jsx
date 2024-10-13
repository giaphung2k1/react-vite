import "./style.css";


// component = html + css + js
const MyComponent = () => {
    const name = "Giap Van Hung"; // String
	return (
        // fragment
        <> 
            <div className="">{name}</div>
            <div className="child" style={
                {borderRadius: '10px'}
                }>Child</div>
        </>
		
	);
}

const FakeComponent = () => {
    return(
        <div>
            fake component
        </div>
    );
}

export {MyComponent, FakeComponent};