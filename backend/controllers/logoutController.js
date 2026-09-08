const logoutUser = async (req, res) => {
    res.clearCookie("token");

    res.status(200).json({
        message: "Logged out successfully"
    });
};

module.exports = { logoutUser };