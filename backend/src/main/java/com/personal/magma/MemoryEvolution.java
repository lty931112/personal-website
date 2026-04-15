package com.personal.magma;

import com.personal.entity.KnowledgeEntry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

/**
 * MAGMA 记忆演化
 * 跟踪知识条目的变化历史，支持记忆的衰减和强化
 * 通过访问频率和关联度动态调整知识的重要程度
 *
 * @author personal
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class MemoryEvolution {

    private final RedisTemplate<String, Object> redisTemplate;

    /** 访问计数 Redis Key 前缀 */
    private static final String ACCESS_COUNT_PREFIX = "magma:access:";
    /** 知识演化事件 Redis Key 前缀 */
    private static final String EVOLUTION_EVENT_PREFIX = "magma:evolution:";

    /**
     * 记录知识条目的创建事件
     *
     * @param entry 新创建的知识条目
     */
    public void recordCreation(KnowledgeEntry entry) {
        log.info("记录知识创建事件：id={}, title={}", entry.getId(), entry.getTitle());

        String eventKey = EVOLUTION_EVENT_PREFIX + entry.getId();
        EvolutionEvent event = new EvolutionEvent();
        event.setType("CREATE");
        event.setEntryId(entry.getId());
        event.setTimestamp(LocalDateTime.now());
        event.setDescription("知识条目创建");

        redisTemplate.opsForList().rightPush(eventKey, event);
        // 设置过期时间（7天）
        redisTemplate.expire(eventKey, 7, TimeUnit.DAYS);
    }

    /**
     * 记录知识条目的更新事件
     *
     * @param entry 更新后的知识条目
     */
    public void recordUpdate(KnowledgeEntry entry) {
        log.info("记录知识更新事件：id={}, title={}", entry.getId(), entry.getTitle());

        String eventKey = EVOLUTION_EVENT_PREFIX + entry.getId();
        EvolutionEvent event = new EvolutionEvent();
        event.setType("UPDATE");
        event.setEntryId(entry.getId());
        event.setTimestamp(LocalDateTime.now());
        event.setDescription("知识条目更新");

        redisTemplate.opsForList().rightPush(eventKey, event);
        redisTemplate.expire(eventKey, 7, TimeUnit.DAYS);
    }

    /**
     * 记录知识条目的访问事件
     * 用于实现记忆衰减和强化机制
     *
     * @param entryId 知识条目 ID
     */
    public void recordAccess(Long entryId) {
        String accessKey = ACCESS_COUNT_PREFIX + entryId;
        Long count = redisTemplate.opsForValue().increment(accessKey);
        // 设置过期时间（30天未访问则衰减）
        redisTemplate.expire(accessKey, 30, TimeUnit.DAYS);

        log.debug("记录知识访问：id={}, 累计访问={}", entryId, count);
    }

    /**
     * 获取知识条目的访问热度
     * 基于近期访问频率计算
     *
     * @param entryId 知识条目 ID
     * @return 热度值（0-1）
     */
    public double getHeatScore(Long entryId) {
        String accessKey = ACCESS_COUNT_PREFIX + entryId;
        Object countObj = redisTemplate.opsForValue().get(accessKey);
        long count = countObj != null ? Long.parseLong(countObj.toString()) : 0;

        // 简单的热度计算：使用对数函数避免无限增长
        return Math.min(1.0, Math.log(count + 1) / Math.log(100));
    }

    /**
     * 演化事件内部类
     */
    public static class EvolutionEvent {
        private String type;
        private Long entryId;
        private LocalDateTime timestamp;
        private String description;

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public Long getEntryId() { return entryId; }
        public void setEntryId(Long entryId) { this.entryId = entryId; }
        public LocalDateTime getTimestamp() { return timestamp; }
        public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
}
