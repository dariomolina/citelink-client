import React from 'react'
import { Link, NavLink} from 'react-router-dom'

export const NavBar = () => {
  return (
		<>
    <nav className="navbar navbar-expand-lg bg-body-tertiary border">
			<div className="container-fluid">
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item dropdown">
							<Link className="nav-link active" to="/list-notifications" role="button">
							Notifications
							</Link>
						</li>
						<li className="nav-item dropdown">
							<Link className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Suscriptions
							</Link>
							<ul className="dropdown-menu">
								<li><NavLink className="nav-link" to="/create-suscriptions">Create</NavLink></li>
								<li><NavLink className="nav-link" to="/list-suscriptions">List</NavLink></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		</>
	)
}
