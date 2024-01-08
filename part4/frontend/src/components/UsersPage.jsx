import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams, useNavigate
  } from 'react-router-dom'


const UsersPage = ({users}) => {

        if (!users) {
          return null
        }
        console.log('users', users)
        return (
          <div>

          <table>
            <thead>
              <tr>
                <th>user</th>
                <th>blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user =>
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                  <td>{user.blogs.length}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        )
      }
export default UsersPage