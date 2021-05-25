import "./styles.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  className,
  children,
  ...props
}) => {
  return (
    <button className={`buttonContainer ${className || ""}`} {...props}>
      {icon && <span className="icon">{icon}</span>}

      {children && <span className="content">{children}</span>}
    </button>
  );
};

export default Button;
