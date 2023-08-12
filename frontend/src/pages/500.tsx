function ErrorPage() {
    return (
        <section>
            <div className="py-8 px-4 container lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">500</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl ">
                        Internal Server Error.
                    </p>
                    <p className="mb-4 text-lg font-light">
                        We are already working to solve the problem.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ErrorPage;