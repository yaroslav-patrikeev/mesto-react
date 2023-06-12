import logo from '../images/logo.svg';

export default function Header() {
    return (
        <header className="header header_position">
          <img src={logo} alt="Логотип" className="header__image"/>
        </header>
    );
}