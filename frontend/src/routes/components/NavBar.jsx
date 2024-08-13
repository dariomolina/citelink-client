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
							<Link className="nav-link active" to="/all-notifications" role="button">
							All Notifications
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		</>
	)
}
