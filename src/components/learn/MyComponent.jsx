import "./style.css";


// component = html + css + js
const MyComponent = () => {
	return (
        // fragment
        <> 
            <div className="">first component</div>
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