import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap'
import './Login.css';


const Landing = () => {
    const navigate = useNavigate();
  return (
    <div  id='land' className="landing-page d-flex align-items-center justify-content-center vh-100 bg-light">
      <Container className="text-center">
        <h1>Welcome to BookStore</h1>
        <p className="mb-4">Your gateway to the world of books!</p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/login")}
        >
          Enter Website
        </Button>
      </Container>
    </div>
  );
  
}

export default Landing