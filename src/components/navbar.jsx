import { useNavigate } from 'react-router-dom';
function Navbar() {const navigate = useNavigate();
return (
<nav>
<a href="/">DEV@Deakin</a>
<input type="text" placeholder="Search..." />

  <div className="nav-right">
    <button type="button" onClick={() => navigate('/post')}>
  Post
    </button>
    <a href="/login">Login</a>
  </div>
</nav>

);
}

export default Navbar;