const Avatar = ({ src, alt = "avatar" }) => {
    return (
        <div
            className="avatar"
            role="img"
            aria-label={alt}
            style={{
                backgroundImage: `url(${src})`,
            }}
        />
    );
};

export default Avatar;
