import './LeftSideParent.css'
import LeftSideChild from './LeftSideChild';

const LeftSideParent = () => {

    return (
        <div className="left-side">
            Search: <input type="text" id="search" name="search" style={{ marginRight: "2%" }} />
            <button>Search</button><br /><br />
            <LeftSideChild />
        </div>
    ); 
}
export default LeftSideParent;