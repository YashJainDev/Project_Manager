import {Link} from 'react-router-dom';
export default function Home({}) {
  return <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="https://media.istockphoto.com/id/2188456567/vector/flat-vector-of-scrum-agile-methodology-for-software-development.jpg?s=1024x1024&w=is&k=20&c=lDCPANSEPw1p0yEHGpnOLpd5b3-Io-SZi7dENSkJk-A=" className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Transform Your Workflow </h1><br /><h1 className="text-5xl font-bold">with TaskFlow</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <Link to="/login">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>;
}
  