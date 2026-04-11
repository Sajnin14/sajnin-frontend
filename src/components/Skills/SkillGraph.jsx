import { motion } from 'framer-motion'
import { useMemo } from 'react'
import styles from './Skills.module.css'

const Fingerprint = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }} aria-hidden="true">
        <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10v.8c0 1.25-.97 2.2-2.12 2.2-1.03 0-1.88-.84-1.88-1.88V12c0-3.31-2.69-6-6-6s-6 2.69-6 6v2.5c0 1.5 1.13 2.7 2.63 2.7h.37c2.2 0 4-1.8 4-4 0-1.1-.9-2-2-2s-2 .9-2 2v2" />
    </svg>
)

// Skill Data Structure
const skillData = {
    id: 'core',
    label: 'Sajnin Saima',
    type: 'core',
    children: [
        {
            id: 'frontend-core',
            label: 'Frontend Core',
            type: 'category',
            color: '#00ff88',
            children: [
                { id: 'html', label: 'HTML5', type: 'skill' },
                { id: 'css', label: 'CSS3', type: 'skill' },
                { id: 'js', label: 'JavaScript (ES6+)', type: 'skill' },
                { id: 'dom', label: 'DOM Manipulation', type: 'skill' },
                { id: 'responsive', label: 'Responsive Design', type: 'skill' },
                { id: 'accessibility', label: 'Web Accessibility', type: 'skill' },
            ]
        },
        {
            id: 'ui-styling',
            label: 'UI Styling',
            type: 'category',
            color: '#00d4ff',
            children: [
                { id: 'tailwind', label: 'Tailwind CSS', type: 'skill' },
                { id: 'gsap', label: 'GSAP', type: 'skill' },
                // { id: 'scss', label: 'SCSS / SASS', type: 'skill' },
                { id: 'mui', label: 'Material UI', type: 'skill' },
                { id: 'figma', label: 'Figma to Code', type: 'skill' },
                { id: 'animation', label: 'CSS Animations', type: 'skill' },
                { id: 'framer', label: 'Framer Motion', type: 'skill' },
            ]
        },
        {
            id: 'tools-frameworks',
            label: 'Tools & Frameworks',
            type: 'category',
            color: '#bd00ff',
            children: [
                { id: 'react', label: 'React.js', type: 'skill' },
                { id: 'next', label: 'Next.js', type: 'skill' },
                { id: 'context', label: 'Context API', type: 'skill' },
                { id: 'redux', label: 'Redux (Basic)', type: 'skill' },
                { id: 'hookform', label: 'React Hook Form', type: 'skill' },
                { id: 'axios', label: 'Axios / API Integration', type: 'skill' },
                { id: 'git', label: 'Git & GitHub', type: 'skill' },
                { id: 'vite', label: 'Vite', type: 'skill' },
            ]
        }
    ]
}

const SkillGraph = () => {
    // Generate Positions (Radial Layout)
    const nodes = useMemo(() => {
        const nodeList = []
        const edgesList = []

        // Center
        nodeList.push({ ...skillData, x: 50, y: 50, level: 0 })

        // Categories (Level 1)
        const catCount = skillData.children.length
        skillData.children.forEach((cat, i) => {
            const angle = (i / catCount) * 2 * Math.PI - Math.PI / 2
            const radius = 22 // Increased from 16 to provide more space from center
            const x = 50 + Math.cos(angle) * radius * 1.6
            const y = 50 + Math.sin(angle) * radius

            nodeList.push({ ...cat, x, y, level: 1, parentId: 'core' })
            edgesList.push({ from: 'core', to: cat.id, color: cat.color })

            // Skills (Level 2)
            const skillCount = cat.children.length
            const angleSpan = (2 * Math.PI) / catCount
            const startAngle = angle - angleSpan / 2

            cat.children.forEach((skill, i2) => {
                const spreadFactor = 0.85
                const startOffset = 0.1

                const skillAngle = startAngle + (i2 / (skillCount - 1)) * angleSpan * spreadFactor + (angleSpan * startOffset)
                const skillRadius = 40 // Increased vertical distance
                const sx = 50 + Math.cos(skillAngle) * skillRadius * 1.2 // Reduced X-multiplier to 1.2 to prevent clipping
                const sy = 50 + Math.sin(skillAngle) * skillRadius

                nodeList.push({ ...skill, x: sx, y: sy, level: 2, parentId: cat.id, color: cat.color })
                edgesList.push({ from: cat.id, to: skill.id, color: cat.color })
            })
        })
        return { nodeList, edgesList }
    }, [])

    return (
        <div className={styles.graphContainer}>
            <svg className={styles.connections} aria-hidden="true">
                {nodes.edgesList.map((edge, i) => {
                    const fromNode = nodes.nodeList.find(n => n.id === edge.from)
                    const toNode = nodes.nodeList.find(n => n.id === edge.to)

                    if (!fromNode || !toNode) return null

                    return (
                        <motion.line
                            key={i}
                            x1={`${fromNode.x}%`}
                            y1={`${fromNode.y}%`}
                            x2={`${toNode.x}%`}
                            y2={`${toNode.y}%`}
                            stroke={edge.color}
                            strokeWidth="2"
                            strokeOpacity="0.8"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />
                    )
                })}
            </svg>

            {nodes.nodeList.map((node) => (
                <Node key={node.id} node={node} />
            ))}
        </div>
    )
}

const Node = ({ node }) => {
    return (
        <motion.div
            className={`${styles.node} ${styles[node.type]}`}
            style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                borderColor: node.color,
                boxShadow: `0 0 20px ${node.color}40`,
                transform: 'translate(-50%, -50%)' /* FORCE CENTER */
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
                type: 'spring',
                duration: 1,
                delay: node.level * 0.2
            }}
            whileHover={{ scale: 1.2, zIndex: 100 }}
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            role="img"
            aria-label={node.label}
        >
            <div className={styles.nodeContent} style={{ color: node.color || '#fff' }}>
                {node.level === 0 ? <div style={{ marginBottom: 5 }}><Fingerprint /></div> : null}
                <span className={styles.nodeLabel}>{node.label}</span>
            </div>
            {/* Orbiting particles for flair */}
            {node.level < 2 && (
                <motion.div
                    className={styles.orbitRing}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    style={{ borderColor: node.color }}
                    aria-hidden="true"
                />
            )}
        </motion.div>
    )
}

export default SkillGraph
