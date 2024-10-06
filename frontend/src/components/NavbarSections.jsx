import '@styles/navbarSections.css'


export const NavbarSections = ({ currentSection, toggleSection, sections }) => {
  return (
    <div className='navbar-sections d-flex justify-content-between flex-wrap gap-3'>
      {sections.map(({ id, label }, idx) => (
        <button
          key={id}
          id={id}
          className={`btn btn-lg btn-primary ${currentSection === idx ? 'active' : ''}`}
          onClick={() => { toggleSection(idx) }}
        >{label}</button>
      ))}
    </div>
  )
}
