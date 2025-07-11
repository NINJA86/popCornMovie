import React, { useState } from 'react';

function Navbar({ children }) {
  const [query, setQuery] = useState('');
  return (
    <>
      <nav className="nav-bar">{children}</nav>
    </>
  );
}

export default Navbar;
