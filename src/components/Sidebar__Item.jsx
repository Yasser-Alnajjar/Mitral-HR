import Link from "next/link";
export default function SidebarItem({ icon, title, link }) {
  return (
    <li className="sidebar__list__item" title={title}>
      <Link href={link} className="sidebar__list__item__link">
        <span className="sidebar__list__item__link__icon">{icon}</span>
        <span className="sidebar__list__item__link__title">{title}</span>
      </Link>
    </li>
  );
}
