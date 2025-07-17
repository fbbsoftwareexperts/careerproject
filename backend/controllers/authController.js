const User = require("../model/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const {
      fullName, age, currentStudies, subOption, state,
      district, email, mobile, password, confirmPassword, howYouGotToKnow
    } = req.body;

    // Basic validation
    if (password !== confirmPassword) return res.status(400).json({ msg: "Passwords do not match" });

    // Check for duplicates
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) return res.status(400).json({ msg: "Email or Mobile already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      age,
      currentStudies,
      subOption,
      state,
      district,
      email,
      mobile,
      password: hashedPassword,
      howYouGotToKnow
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }]
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    res.status(200).json({ msg: "Login successful", userId: user._id });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
