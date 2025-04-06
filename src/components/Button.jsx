function Button(props) {
    return (
      <button
        {...props}
        className={`bg-slate-400 p-2 rounded-md text-white flex items-center justify-center aspect-square ${props.className || ""}`}
      >
        {props.children}
      </button>
    );
  }
  
  export default Button;