import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>关于英语块学习</h1>
            
            <section className={styles.section}>
                <h2>什么是英语块学习？</h2>
                <p>
                    英语块学习是一种基于语言组块（Chunks）的学习方法。不同于传统的单词记忆和语法规则学习，
                    英语块学习强调掌握常用的语言表达单位，这些表达单位是自然、地道的英语表达方式。
                </p>
            </section>

            <section className={styles.section}>
                <h2>学习原理</h2>
                <ul className={styles.list}>
                    <li>
                        <strong>自然语言单位：</strong>
                        语言块是自然交际中最常用的表达单位，它们是完整的、有意义的语言组合。
                    </li>
                    <li>
                        <strong>情境化学习：</strong>
                        ��个语言块都与特定的使用场景相关联，帮助学习者理解何时何地使用这些表达。
                    </li>
                    <li>
                        <strong>记忆效率：</strong>
                        相比单独记忆单词，学习语言块能够更好地理解和记住单词的搭配关系。
                    </li>
                    <li>
                        <strong>实用性强：</strong>
                        所学习的内容直接来自于日常交际中的常用表达，可以立即应用到实际交流中。
                    </li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>期望效果</h2>
                <ul className={styles.list}>
                    <li>提高口语表达的流畅度和自然度</li>
                    <li>增强语言直觉，培养英语思维</li>
                    <li>扩大词汇量，掌握更多地道表达</li>
                    <li>提升听力理解能力</li>
                    <li>在实际交际中更有自信</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>如何使用本平台？</h2>
                <ol className={styles.list}>
                    <li>浏览英语块广场，找到��兴趣的语言块</li>
                    <li>点击卡片收听标准发音</li>
                    <li>通过YouTube链接查看更多发音示例</li>
                    <li>收藏喜欢的语言块以便复习</li>
                    <li>在合适的场景中尝试使用这些表达</li>
                </ol>
            </section>
        </div>
    );
} 