// export default function Sidebar({ children, toggle, close, classNames }) {
//   return (
//     <nav
//       className={`sidebar ${classNames ? classNames : ""} ${
//         toggle ? "dark" : ""
//       } ${close ? "" : "close"}`}
//     >
//       {children}
//     </nav>
//   );
// }
// export function Header({ children, icon, close, setClose, classNames }) {
//   return (
//     <header className={`${classNames ? classNames : ""}`}>
//       <div className="image-text">{children}</div>
//       <div className="toggle" onClick={() => setClose(!close)}>
//         {icon}
//       </div>
//     </header>
//   );
// }
// Header.Brand = function HeaderBrand({ src, alt, classNames }) {
//   return (
//     <span className="image">
//       <img src={src} alt={alt} className={classNames ? classNames : ""} />
//     </span>
//   );
// };
// Header.Name = function HeaderName({ children }) {
//   return (
//     <div className="text logo-text">
//       <span className="name">{children}</span>
//     </div>
//   );
// };

// export function Nav({ children, classNames }) {
//   return (
//     <div className={`menu-bar ${classNames ? classNames : ""}`}>{children}</div>
//   );
// }
// Nav.Menu = function NavMenu({ children }) {
//   return (
//     <div className="menu">
//       <ul className="menu-links">{children}</ul>
//     </div>
//   );
// };
// Nav.Link = function NavLink({ children, icon }) {
//   return (
//     <li className="nav-link">
//       <a href="#">
//         <span className="icon">{icon}</span>
//         <span className="text nav-text">{children}</span>
//       </a>
//     </li>
//   );
// };
// Nav.Bottom = function NavBottom({ children, classNames }) {
//   return (
//     <div className={`bottom-content ${classNames ? classNames : ""}`}>
//       {children}
//     </div>
//   );
// };
// Nav.BottomLink = function NavBottomLink({ children, icon }) {
//   return (
//     <li>
//       <a href="#">
//         <span className="icon">{icon}</span>
//         <span className="text nav-text">{children}</span>
//       </a>
//     </li>
//   );
// };
// Nav.Mode = function NavMode({
//   children,
//   sunIcon,
//   moonIcon,
//   toggle,
//   classNames,
// }) {
//   return (
//     <li className={`mode ${classNames ? classNames : ""}`}>
//       <div className="sun-moon">
//         <span className="icon sun">{sunIcon}</span>
//         <span className="icon moon">{moonIcon}</span>
//       </div>
//       <span className="mode-text text">{!toggle ? "Dark" : "Light"}</span>
//       {children}
//     </li>
//   );
// };
// Nav.Toggle = function toggleswitch({ setToggle, toggle }) {
//   return (
//     <div onClick={() => setToggle(!toggle)} className="toggle-switch">
//       <span className="switch"></span>
//     </div>
//   );
// };

export default function Sidebar() {
  return (
    <nav class="sidebar close">
      <header>
        <div class="image-text">
          <span class="image">
            <img src="favicon.ico" alt="favicon" />
          </span>
          <div class="text logo-text">
            <span class="name">Codinglab</span>
            <span class="profession">Web developer</span>
          </div>
        </div>
        <i class="bx bx-chevron-right toggle"></i>
      </header>
      <div class="menu-bar">
        <div class="menu">
          <ul class="menu-links">
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-home-alt icon"></i>
                <span class="text nav-text">Dashboard</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-bar-chart-alt-2 icon"></i>
                <span class="text nav-text">Revenue</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-bell icon"></i>
                <span class="text nav-text">Notifications</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-pie-chart-alt icon"></i>
                <span class="text nav-text">Analytics</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-heart icon"></i>
                <span class="text nav-text">Likes</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-wallet icon"></i>
                <span class="text nav-text">Wallets</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="bottom-content">
          <li class="">
            <a href="#">
              <i class="bx bx-log-out icon"></i>
              <span class="text nav-text">Logout</span>
            </a>
          </li>
          <li class="mode">
            <div class="sun-moon">
              <i class="bx bx-moon icon moon"></i>
              <i class="bx bx-sun icon sun"></i>
            </div>
            <span class="mode-text text">Dark mode</span>
            <div class="toggle-switch">
              <span class="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
}
