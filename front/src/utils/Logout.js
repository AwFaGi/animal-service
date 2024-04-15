export default (navigate, toast) => {
    toast.error("Сессия истекла");
    localStorage.clear();
    setTimeout(() => {
        navigate("/login", {replace: true});
    }, 2000);
}