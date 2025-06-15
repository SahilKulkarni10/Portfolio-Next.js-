"use client";
import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Send,
  Phone,
  MapPin,
} from "lucide-react";
import emailjs from "@emailjs/browser";

/*
Updated the Portfolio component to use the new lucide icons and framer-motion animations.
*/

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      await emailjs.send(
        "service_zz47vzo",
        "template_5suhiqe",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "6jjVwrK_vvRunMlB3"
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const projects = [
    {
      title: "ResumeRefine",
      description: "AI-powered resume analysis and improvement platform",
      tags: ["Next.js", "AI/ML", "Tailwind CSS"],
      github: "https://github.com/SahilKulkarni10/ResumeRefine",
      live: "https://resumerefine.vercel.app",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000",
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "CampusConnect",
      description: "Social networking platform for college students",
      tags: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/SahilKulkarni10/campusclient",
      live: "https://campusclient.vercel.app",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000",
      color: "from-green-500 to-teal-500",
    },
    
    {
      title: "ForestFire.ai",
      description: "AI-based forest fire detection system",
      tags: ["Next.js", "AI/ML", "Tailwind CSS"],
      github: "https://github.com/SahilKulkarni10/ForestFire.ai",
      live: "https://forest-fire-ai.vercel.app",
      image:
        "https://images.unsplash.com/photo-1600181957881-b96c42bc6fab?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "from-orange-500 to-red-500",
    },
    {
      title:"MetaConnect",
      description: "Real-time collaborative coding platform for developers",
      tags: ["ReactNative", "Node.js", "Socket.io"],
      github: "https://github.com/SahilKulkarni10/MetaConnect",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
      color: "from-purple-500 to-pink-500",
    }
  ];

  const StarBackground = () => {
    return dimensions.width > 0 ? (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              opacity: Math.random(),
            }}
            animate={{
              y: [null, -1000],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    ) : null;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a href="#">
              <motion.h1
                className="text-2xl font-bold"
                whileHover={{ scale: 1.05 }}
              >
                Sahil Kulkarni
              </motion.h1>
            </a>
            <div className="hidden md:flex space-x-8">
              {["Projects", "About", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-gray-300 relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="p-4 space-y-4">
                  {["Projects", "About", "Contact"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block hover:text-gray-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"
          animate={{
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <StarBackground />
        <motion.div
          className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10"
          style={{ y }}
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mb-6"
          >
            <motion.h1 className="text-6xl md:text-8xl font-bold">
              Full Stack Developer
            </motion.h1>
          </motion.div>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          >
            AI/ML Enthusiast & Problem Solver
          </motion.p>
          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {[
              { Icon: Github, href: "https://github.com/SahilKulkarni10" },
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/in/sahil-kulkarni-181ab1246/",
              },
              { Icon: Mail, href: "mailto:kulkarnisahil882@gmail.com" },
            ].map(({ Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                className="p-3 hover:text-gray-300 relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={28} />
              </motion.a>
            ))}
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </motion.div>
      </section>
      <section id="projects" className="py-32 bg-black">
        <motion.div
          className="max-w-6xl mx-auto px-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
            variants={item}
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-gray-900 rounded-lg overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      className="flex items-center text-gray-400 hover:text-white"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={20} className="mr-1" /> Code
                    </motion.a>
                    <motion.a
                      href={project.live}
                      className="flex items-center text-gray-400 hover:text-white"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={20} className="mr-1" /> Live
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      <section id="about" className="py-32 bg-gray-900">
        <motion.div
          className="max-w-6xl mx-auto px-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
            variants={item}
          >
            About Me
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={item} className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Background</h3>
                  <p className="text-gray-400">
                    Web developer and AI/ML enthusiast with a passion for
                    building innovative applications. Experienced in creating
                    dynamic systems using cutting-edge technologies.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Experience</h3>
                  <p className="text-gray-400">
                    Successfully completed projects in AI/ML, web development,
                    and IoT, including credit card fraud detection, SAR image
                    colorization, and a resume filtration system. Actively
                    contributing to hackathon and institution-focused projects.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={item} className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p className="text-gray-400">
                    Pursuing a degree in Computer Science with a focus on
                    Machine Learning and Artificial Intelligence, developing
                    strong technical and problem-solving skills.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Skills</h3>
                  <p className="text-gray-400">
                    React, Node.js, Python, TensorFlow, Flask, MongoDB, MySQL,
                    Next.js, TypeScript, and API development.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <section id="contact" className="py-32 bg-black">
        <motion.div
          className="max-w-6xl mx-auto px-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
            variants={item}
          >
            Get In Touch
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={item} className="space-y-8">
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400">kulkarnisahil882@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400">+91 8329076760</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400">Nashik, India</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={item} className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                {status === "success" && (
                  <div className="text-green-500">
                    Message sent successfully!
                  </div>
                )}
                {status === "error" && (
                  <div className="text-red-500">
                    Failed to send message. Please try again.
                  </div>
                )}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 bg-white text-black font-semibold rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Send className="w-5 h-5" />
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <footer className="py-8 bg-gray-900">
        <motion.div
          className="max-w-6xl mx-auto px-4 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p>© 2025 Sahil Kulkarni. All rights reserved.</p>
        </motion.div>
      </footer>
    </div>
  );
};

export default Portfolio;
