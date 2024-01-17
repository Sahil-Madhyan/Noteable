import React from 'react';

const About = (props) => {
  return (
    <div className={`container ${props.mode === 'light' ? 'bg-white' : 'bg-dark'} text-${props.mode === 'light' ? 'dark' : 'light'}`}>
      <h1 className="my-3 text-center">About Us</h1>
      <div className="card mb-4">
        <div className={`card-body ${props.mode === 'light' ? 'bg-white' : 'bg-dark'} text-${props.mode === 'light' ? 'dark' : 'light'} border-${props.mode === 'light' ? '' : 'light'} rounded`}>
          <h5 className="card-title"><i className="fas fa-handshake me-2"></i>Welcome to Noteable</h5>
          <p className="card-text">
            Noteable is a simple and intuitive notebook application that allows you to easily jot down and manage your notes. Whether you need to capture your thoughts, make to-do lists, or organize important information, Noteable has got you covered.
          </p>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4">
        <div className={`col mb-2`}>
          <div className={`card h-100 ${props.mode === 'light' ? 'bg-white' : 'bg-dark'} text-${props.mode === 'light' ? 'dark' : 'light'} border-${props.mode === 'light' ? '' : 'light'}`}>
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-plus-circle me-2"></i>
                Add Notes
              </h5>
              <p className="card-text">
                Easily add new notes to your notebook with just a few clicks.
              </p>
            </div>
          </div>
        </div>
        <div className={`col mb-2`}>
          <div className={`card h-100 ${props.mode === 'light' ? 'bg-white' : 'bg-dark'} text-${props.mode === 'light' ? 'dark' : 'light'} border-${props.mode === 'light' ? '' : 'light'}`}>
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-pen-square me-2"></i>
                Update Notes
              </h5>
              <p className="card-text">
                Easily edit and update your existing notes as per your requirements.
              </p>
            </div>
          </div>
        </div>
        <div className={`col mb-2`}>
          <div className={`card h-100 ${props.mode === 'light' ? 'bg-white' : 'bg-dark'} text-${props.mode === 'light' ? 'dark' : 'light'} border-${props.mode === 'light' ? '' : 'light'}`}>
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-trash-alt me-2"></i>
                Delete Notes
              </h5>
              <p className="card-text">
                Easily delete unwanted or unnecessary notes from your notebook.
              </p>
            </div>
          </div>
        </div>
        <div className={`col mb-2`}>
          <div className={`card h-100 ${props.mode === 'light' ? 'bg-white' : 'bg-dark'} text-${props.mode === 'light' ? 'dark' : 'light'} border-${props.mode === 'light' ? '' : 'light'}`}>
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-tags me-2"></i>
                Tagging Notes
              </h5>
              <p className="card-text">
                Organize your notes by adding tags and easily search and filter them.
              </p>
            </div>
          </div>
        </div>
        <div className={`col mb-2`}>
          <div className={`card h-100 ${props.mode === 'light' ? 'bg-white' : 'bg-dark'} text-${props.mode === 'light' ? 'dark' : 'light'} border-${props.mode === 'light' ? '' : 'light'}`}>
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-sign-in-alt me-2"></i>
                Login / Sign Up
              </h5>
              <p className="card-text">
                Securely log in to your account or create a new account to access your notes.
              </p>
            </div>
          </div>
        </div>
        <div className={`col mb-2`}>
          <div className={`card h-100 ${props.mode === 'light' ? 'bg-white' : 'bg-dark'} text-${props.mode === 'light' ? 'dark' : 'light'} border-${props.mode === 'light' ? '' : 'light'}`}>
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-bolt me-2"></i>
                Faster Site Loading
              </h5>
              <p className="card-text">
                Enjoy faster loading times and a smooth user experience with optimized performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
